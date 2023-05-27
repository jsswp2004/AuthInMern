//#region Imports
import React, { useEffect, useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import backward from "../shared/images/backward.jpg";
import forward from "../shared/images/forward.jpg";
import { useAlert } from "react-alert";

import {
  format,
  getDate,
  startOfMonth,
  getDay,
  endOfMonth,
  addDays,
  addMonths,
  addWeeks,
  startOfWeek,
  getMonth,
  getYear,
  isSaturday,
  isSunday,
  isWeekend,
} from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import VisitDaily from "../Scheduling/visitMonthlyDaily";
import Navbar from "../navigation/navbar";
import Header from "../shared/Header";
import {
  View,
  monthNames,
} from "../listDictionaries/listData/listDictionariesData";
import axios from "axios";
import CreateVisitModal from "../Scheduling/createVisitModal";
import VisitMonthlyModal from "../PatientRegistration/ShowPatientListModal";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import EditVisitModal from "../Scheduling/editVisitModal";
import DetailVisitModal from "../PatientVisit/detailsPatientVisitModal";
import SMSMessagesModal from "../SMSMessage/SMSForm";
import EmailMessagesModal from "../PatientVisit/sendEmailToPatientModal";
import ReactToPrint from "react-to-print";
//#endregion

export default function ClinicVisit() {
  // const userx = useContext(UserContext);
  // Component to print
  const componentToPrintRef = useRef();
  //#region local storage to pull curresnt user name and role
  const useremail = localStorage.getItem("email");
  const [currentUser, setCurrentUser] = useState([
    {
      _id: "",
      // email: '',
      facilityID: "",
      role: "",
      firstName: "",
    },
  ]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/users`)
      .then((response) => {
        const data = response.data;
        setCurrentUser(data.find((user) => user.email === useremail));
      })
      .catch((error) => {
        console.log("Error from user list");
      });
  }, [useremail]);
  const { _id, facilityID, role, firstName } = currentUser;
  // console.log(currentUser, _id, facilityID, role, firstName)
  // localStorage.setItem('role', role)

  //setting local storage for role
  useEffect(() => {
    localStorage.setItem("role", role);
    localStorage.setItem("firstName", firstName);
  }, [firstName, role]);
  //#endregion
  //#region for alert declaration
  // const alert = useAlert()
  //#endregion
  //#region for setting state and pulling data for provider MD
  const [selectExceptionMD, setSelectExceptionMD] = useState([]);
  const [selectAvailabilityMD, setSelectAvailabilityMD] = useState([]);
  const [userMD, setUserMD] = useState([]);
  const attendings = userMD.filter((user) => {
    return user.role.toString().toLowerCase().includes("attending");
  });
  console.log(selectExceptionMD);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/users")
      .then((response) => {
        const data = response.data;
        setUserMD(data);
      })
      .catch((error) => {
        console.log("Error from user list");
      });
  }, []);

  const providerMD = attendings.map(
    (doc) => doc.firstName + " " + doc.lastName
  );
  //#endregion
  //#region code for setting state for visits
  const [visits, setVisits] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/visits")
      .then((res) => {
        setVisits(res.data);
      })
      .catch((err) => {
        console.log("Error from ShowVisitList");
      });
  }, []);
  const { checkIn, checkOut } = visits;
  console.log(checkIn, checkOut);
  //#endregion
  //#region code for calendar view select dropdown
  const [selectViewValue, setViewValue] = React.useState("Monthly");
  const viewValueChange = (event) => {
    setViewValue(event.target.value);
  };
  //changes view value to daily when clicked
  // const dailyValueChange = (event) => {
  //   setViewValue('Daily')
  // }

  //#endregion
  //#region base date values for calendar
  const [showDateValue, setShowDateValue] = useState(new Date());
  const dateSelected = format(showDateValue, "yyyy-MM-dd");
  // console.log(format(showDateValue, 'yyyy-MM-dd'), dateSelected)
  let newdate = new Date(showDateValue);
  let monthIndex = newdate.getMonth();
  let monthName = monthNames[monthIndex].value;
  let startOfTheMonth = startOfMonth(new Date(showDateValue));
  const currentYear = newdate.getFullYear();
  let startOfTheMonthDayNumber = getDay(startOfMonth(showDateValue));
  let startOfTheMonthDay = getDate(startOfMonth(showDateValue));
  let endOfTheMonthDay = getDate(endOfMonth(showDateValue));
  const gridWeekly = {
    fontSize: "14px",
    height: "calc(100vh - 132px)",
  };

  //pulls date number of the week
  let startOfTheWeek = startOfWeek(newdate).getDate();
  let startOfTheWeekDate = startOfWeek(newdate);
  let startOfTheWeekEndOfMonth = endOfMonth(startOfTheWeekDate).getDate();
  //#endregion
  //#region for Email to Patient Modal
  const EmailMessageModal = () => (
    <>
      <Modal
        show={showEmailMessage}
        onHide={handleEmailMessageClose}
        size="med"
        centered
      >
        <Modal.Header>
          <Modal.Title>Send an Email</Modal.Title>
          <Button variant="secondary" onClick={handleShowEmailMessageClick}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <EmailMessagesModal visitID={visitID} />
        </Modal.Body>
      </Modal>
    </>
  );

  //Function to display email message modal
  function displayShowEmailMessageModal() {
    return <EmailMessageModal />;
  }

  //Define the state for email message modal
  const [showEmailMessage, setShowEmailMessage] = useState(false);
  const handleEmailMessageClose = () => setShowEmailMessage(false);
  const handleEmailMessageShow = () => {
    setShowEmailMessage(true);
  };

  const handleShowEmailMessageClick = (e) => {
    e.preventDefault();
    setShowEmailMessage(false);
  };

  //#endregion
  //#region for SMS Modal
  const SMSMessageModal = () => (
    <>
      <Modal
        show={showSMSMessage}
        onHide={handleSMSMessageClose}
        size="med"
        centered
      >
        <Modal.Header>
          <Modal.Title>Send a reminder</Modal.Title>
          <Button variant="secondary" onClick={handleShowSMSMessageClick}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <SMSMessagesModal visitID={visitID} />
        </Modal.Body>
      </Modal>
    </>
  );

  //Function to display SMS Modal
  function displayShowSMSMessageModal() {
    return <SMSMessageModal />;
  }

  //Define the state for SMS Modal
  const [showSMSMessage, setShowSMSMessage] = useState(false);
  const handleSMSMessageClose = () => setShowSMSMessage(false);
  const handleSMSMessageShow = () => {
    setShowSMSMessage(true);
  };

  const handleShowSMSMessageClick = (e) => {
    e.preventDefault();
    setShowSMSMessage(false);
  };

  //#endregion
  //#region for Visit Details Modal
  const ShowDetailVisitModal = () => (
    <>
      <Modal
        show={showDetailVisit}
        onHide={handleDetailVisitClose}
        size="lg"
        centered
      >
        <Modal.Header>
          <Modal.Title>Visit Details</Modal.Title>
          <Button variant="secondary" onClick={handleDetailVisitClick}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <DetailVisitModal visitID={visitID} />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleVisitClick}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );

  //Function to display create visit from registration modal
  function displayDetailVisitModal() {
    return <ShowDetailVisitModal />;
  }

  //Define the state for edit visit from registration modal
  const [showDetailVisit, setDetailVisitShow] = useState(false);
  const handleDetailVisitClose = () => setDetailVisitShow(false);
  const handleDetailVisitShow = () => {
    setDetailVisitShow(true);
  };

  const handleDetailVisitClick = (e) => {
    e.preventDefault();
    setDetailVisitShow(false);
  };

  //#endregion
  //#region code for Modal methods for creating visit
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [showMonthly, setShowMonthly] = useState(false);
  const handleMonthlyClose = () => setShowMonthly(false);
  const handleMonthlyShow = () => {
    setShowMonthly(true);
  };
  //#endregion
  //#region for Modal
  const selectedDateDaily = format(showDateValue, "yyyy-MM-dd");
  const VisitModal = () => (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add a Visit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateVisitModal visitDate={selectedDateDaily} />
      </Modal.Body>
      <Modal.Footer>
        <span style={{ textAlign: "center" }}>
          Please make sure all information is current and accurate.
        </span>
      </Modal.Footer>
    </Modal>
  );
  // This method will map out the visits on the table
  function displayVisitModal() {
    return <VisitModal />;
  }
  //#endregion
  //#region for Modal from monthly days
  const [newPatient, setNewPatient] = useState(false);
  // const { firstName, lastName, middleName, email, provider, hourOfVisit } = CreatePatientModal
  // console.log(firstName)
  const [modalDisplay, setModalDisplay] = useState("visit");
  const VisitModalMonthly = (visit) =>
    weekendDay === false ? (
      <Modal
        style={{ height: "90dvh", overflowY: "auto" }}
        dialogClassName="modal-lg"
        show={showMonthly}
        onHide={handleMonthlyClose}
        size="lg"
        centered
      >
        {/* <Modal.Header onClick={() => setNewPatient(true)}> */}
        {/* <Modal.Title>
            Add a quick visit

          </Modal.Title> */}
        {/* 
          <Link
            to={`/patientlist`} className="btn btn-secondary addVisitModalBtn "
          >
            <i
              className="fas fa-laptop-medical fa-sm"
              aria-hidden="true"
              title="Search patient"
            /> Search Patient
          </Link> */}

        {/* </Modal.Header> */}
        <Modal.Body style={{ display: newPatient === true ? "" : "none" }}>
          <div
            style={{
              display: modalDisplay === "visit" ? "" : "none",
            }}
          >
            <VisitMonthlyModal
              // firstName={firstName}
              // lastName={lastName}
              // middleName={middleName}
              // email={email}
              visitDate={selectedDate}
              provider={provider}
              // hourOfVisit={hourOfVisit}
            />
          </div>
          {/*  */}
        </Modal.Body>
        <Modal.Footer>
          {/* <span style={{ textAlign: 'center' }}>
            PLEASE MAKE SURE TO REGISTER CLIENT AFTER ADDING QUICK VISIT TO SCHEDULE.
          </span> */}
          <Button variant="secondary" onClick={handleMonthlyClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    ) : null;
  // console.log(provider, selectedDate)
  // This method will map out the visits on the table
  function displayVisitMonthlyModal() {
    return <VisitModalMonthly />;
  }
  //#endregion
  //#region for setting the ID of the provider for the property
  const handleItemClick = (item) => {
    const patID = item._id;
    setVisitID(patID);
  };
  //#endregion
  //#region Define patient ID for create visit from registration modal
  const [visitID, setVisitID] = useState("");
  //#endregion
  //#region Edit Visit Modal from Registration
  const ShowEditVisitModal = () => (
    <>
      <Modal
        size="lg"
        show={showEditVisit}
        onHide={handleEditVisitClose}
        centered
      >
        {/* size="lg" */}
        {/* dialogClassName="modalSizeHeight"  */}
        <Modal.Header>
          <Modal.Title>Edit Visit</Modal.Title>
          <Button variant="secondary" onClick={handleEditVisitClick}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <EditVisitModal visitID={visitID} />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleVisitClick}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );

  //Function to display create visit from registration modal
  function displayEditVisitModal() {
    return <ShowEditVisitModal />;
  }
  //Define the state for edit visit from registration modal
  const [showEditVisit, setEditVisitShow] = useState(false);
  const handleEditVisitClose = () => setEditVisitShow(false);
  const handleEditVisitShow = () => {
    setEditVisitShow(true);
  };

  const handleEditVisitClick = (e) => {
    e.preventDefault();
    setEditVisitShow(false);
  };

  // const handleDetailVisitClick = (e) => {
  //   e.preventDefault()
  //   setEditVisitShow(false)
  // }

  //#endregion
  //#region months dropdown code
  const viewValues = View;
  //#endregion
  //#region for delete method
  const deleteRecord = (id) => {
    axios
      .delete(`http://localhost:8081/api/visits/${id}`)
      .then((response) => {
        setVisits(visits.filter((el) => el._id !== id));
      })
      .catch((error) => {
        console.log("Unable to delete visit");
      });
    window.location.close();
  };
  //#endregion
  //#region for formatting date function
  const formatDay = (el) => {
    return format(el, "yyyy-MM-dd");
  };
  //#endregion
  //#region for filtering data with selected date
  const filterDataWithDat = visits.filter((visit) => {
    return visit.visitDate.toString().toLowerCase().includes(dateSelected);
  });

  const filterDataWithDate = filterDataWithDat.sort((a, b) =>
    a.hourOfVisit > b.hourOfVisit ? 1 : -1
  );
  //console.log(filterDataWithDat)
  //#endregion
  //#region for first day of the month
  const monthlyDay = formatDay(startOfTheMonth); //format(startOfTheMonth, 'yyyy-MM-dd')
  const visitMonthlyDay1 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay);
  });

  function visitListMonthlyDay1() {
    return [...visitMonthlyDay1]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }

  //#endregion
  //#region for second day of the month
  const monthlyDay2 = formatDay(addDays(startOfTheMonth, 1)); //format(addDays(startOfTheMonth, 1), 'yyyy-MM-dd')

  const visitMonthlyDay2 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay2);
  });
  //   console.log(visitMonthlyDay2)
  function visitListMonthlyDay2() {
    return [...visitMonthlyDay2]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }

  //#endregion
  //#region for third day of the month
  const monthlyDay3 = formatDay(addDays(startOfTheMonth, 2));
  const visitMonthlyDay3 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay3);
  });

  function visitListMonthlyDay3() {
    return [...visitMonthlyDay3]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for fourth day of the month
  const monthlyDay4 = formatDay(addDays(startOfTheMonth, 3));
  const visitMonthlyDay4 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay4);
  });

  function visitListMonthlyDay4() {
    return [...visitMonthlyDay4]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for fifth day of the month
  const monthlyDay5 = formatDay(addDays(startOfTheMonth, 4));
  const visitMonthlyDay5 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay5);
  });

  function visitListMonthlyDay5() {
    return [...visitMonthlyDay5]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for sixth day of the month
  const monthlyDay6 = formatDay(addDays(startOfTheMonth, 5));
  const visitMonthlyDay6 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay6);
  });

  function visitListMonthlyDay6() {
    return [...visitMonthlyDay6]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for seventh day of the month
  const monthlyDay7 = formatDay(addDays(startOfTheMonth, 6));
  const visitMonthlyDay7 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay7);
  });

  function visitListMonthlyDay7() {
    return [...visitMonthlyDay7]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for eighth day of the month
  const monthlyDay8 = formatDay(addDays(startOfTheMonth, 7));
  const visitMonthlyDay8 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay8);
  });

  function visitListMonthlyDay8() {
    return [...visitMonthlyDay8]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for ninth day of the month
  const monthlyDay9 = formatDay(addDays(startOfTheMonth, 8));
  const visitMonthlyDay9 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay9);
  });

  function visitListMonthlyDay9() {
    return [...visitMonthlyDay9]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for tenth day of the month
  const monthlyDay10 = formatDay(addDays(startOfTheMonth, 9));
  const visitMonthlyDay10 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay10);
  });

  function visitListMonthlyDay10() {
    return [...visitMonthlyDay10]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for eleventh day of the month
  const monthlyDay11 = formatDay(addDays(startOfTheMonth, 10));
  const visitMonthlyDay11 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay11);
  });

  function visitListMonthlyDay11() {
    return [...visitMonthlyDay11]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for twelfth day of the month
  const monthlyDay12 = formatDay(addDays(startOfTheMonth, 11));
  const visitMonthlyDay12 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay12);
  });

  function visitListMonthlyDay12() {
    return [...visitMonthlyDay12]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for thirteenth day of the month
  const monthlyDay13 = formatDay(addDays(startOfTheMonth, 12));
  const visitMonthlyDay13 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay13);
  });

  function visitListMonthlyDay13() {
    return [...visitMonthlyDay13]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for fourteenth day of the month
  const monthlyDay14 = formatDay(addDays(startOfTheMonth, 13));
  const visitMonthlyDay14 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay14);
  });

  function visitListMonthlyDay14() {
    return [...visitMonthlyDay14]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for fifteenth day of the month
  const monthlyDay15 = formatDay(addDays(startOfTheMonth, 14));
  const visitMonthlyDay15 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay15);
  });

  function visitListMonthlyDay15() {
    return [...visitMonthlyDay15]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for sixteenth day of the month
  const monthlyDay16 = formatDay(addDays(startOfTheMonth, 15));
  const visitMonthlyDay16 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay16);
  });

  function visitListMonthlyDay16() {
    return [...visitMonthlyDay16]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for seventeenth day of the month
  const monthlyDay17 = formatDay(addDays(startOfTheMonth, 16));
  const visitMonthlyDay17 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay17);
  });

  function visitListMonthlyDay17() {
    return [...visitMonthlyDay17]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for eighteenth day of the month
  const monthlyDay18 = formatDay(addDays(startOfTheMonth, 17));
  const visitMonthlyDay18 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay18);
  });

  function visitListMonthlyDay18() {
    return [...visitMonthlyDay18]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for nineteenth day of the month
  const monthlyDay19 = formatDay(addDays(startOfTheMonth, 18));
  const visitMonthlyDay19 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay19);
  });

  function visitListMonthlyDay19() {
    return [...visitMonthlyDay19]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for twentieth day of the month
  const monthlyDay20 = formatDay(addDays(startOfTheMonth, 19));
  const visitMonthlyDay20 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay20);
  });

  function visitListMonthlyDay20() {
    return [...visitMonthlyDay20]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for twenty-first day of the month
  const monthlyDay21 = formatDay(addDays(startOfTheMonth, 20));
  const visitMonthlyDay21 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay21);
  });

  function visitListMonthlyDay21() {
    return [...visitMonthlyDay21]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for twenty-second day of the month
  const monthlyDay22 = formatDay(addDays(startOfTheMonth, 21));
  const visitMonthlyDay22 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay22);
  });

  function visitListMonthlyDay22() {
    return [...visitMonthlyDay22]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for twenty-third day of the month
  const monthlyDay23 = formatDay(addDays(startOfTheMonth, 22));
  const visitMonthlyDay23 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay23);
  });

  function visitListMonthlyDay23() {
    return [...visitMonthlyDay23]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for twenty-fourth day of the month
  const monthlyDay24 = formatDay(addDays(startOfTheMonth, 23));
  const visitMonthlyDay24 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay24);
  });

  function visitListMonthlyDay24() {
    return [...visitMonthlyDay24]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for twenty-fifth day of the month
  const monthlyDay25 = formatDay(addDays(startOfTheMonth, 24));
  const visitMonthlyDay25 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay25);
  });

  function visitListMonthlyDay25() {
    return [...visitMonthlyDay25]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for twenty-sixth day of the month
  const monthlyDay26 = formatDay(addDays(startOfTheMonth, 25));
  const visitMonthlyDay26 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay26);
  });

  function visitListMonthlyDay26() {
    return [...visitMonthlyDay26]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for twenty-seventh day of the month
  const monthlyDay27 = formatDay(addDays(startOfTheMonth, 26));
  const visitMonthlyDay27 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay27);
  });

  function visitListMonthlyDay27() {
    return [...visitMonthlyDay27]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for twenty-eighth day of the month
  const monthlyDay28 = formatDay(addDays(startOfTheMonth, 27));
  const visitMonthlyDay28 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay28);
  });

  function visitListMonthlyDay28() {
    return [...visitMonthlyDay28]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for twenty-ninth day of the month
  const monthlyDay29 = formatDay(addDays(startOfTheMonth, 28));
  const visitMonthlyDay29 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay29);
  });

  function visitListMonthlyDay29() {
    return [...visitMonthlyDay29]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for thirtieth day of the month
  const monthlyDay30 = formatDay(addDays(startOfTheMonth, 29));
  const visitMonthlyDay30 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay30);
  });

  function visitListMonthlyDay30() {
    return [...visitMonthlyDay30]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region for thirty-first day of the month
  const monthlyDay31 = formatDay(addDays(startOfTheMonth, 30));
  const visitMonthlyDay31 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay31);
  });

  function visitListMonthlyDay31() {
    return [...visitMonthlyDay31]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region code for each weekly daily visit dates
  const dateSelectedMonday = format(
    addDays(startOfWeek(showDateValue), 1),
    "yyyy-MM-dd"
  );
  const dateSelectedTuesday = format(
    addDays(startOfWeek(showDateValue), 2),
    "yyyy-MM-dd"
  );

  const dateSelectedWednesday = format(
    addDays(startOfWeek(showDateValue), 3),
    "yyyy-MM-dd"
  );

  const dateSelectedThursday = format(
    addDays(startOfWeek(showDateValue), 4),
    "yyyy-MM-dd"
  );

  const dateSelectedFriday = format(
    addDays(startOfWeek(showDateValue), 5),
    "yyyy-MM-dd"
  );
  //#endregion
  //#region code for filtering visits with dates / this method will filter the table weekly
  const filteredDataWeeklyMonday = visits.filter((el) => {
    return (
      el.visitDate
        // Object.values(el)
        .toString()
        .toLowerCase()
        .includes(dateSelectedMonday)
    );
  });
  const filteredDataWeeklyTuesday = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(dateSelectedTuesday);
  });
  const filteredDataWeeklyWed = visits.filter((el) => {
    return el.visitDate
      .toString()
      .toLowerCase()
      .includes(dateSelectedWednesday);
  });

  const filteredDataWeeklyThursday = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(dateSelectedThursday);
  });
  const filteredDataWeeklyFri = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(dateSelectedFriday);
  });
  //#endregion
  //#region for weekly calendar base date values
  let dayOfSunday = 1;
  const gridWeeklyStart = {
    gridColumnStart: dayOfSunday,
    backgroundColor: " #eeee",
    height: "calc(100vh - 110px)",
    width: "100%",
  };

  const gridWeeklyStartSun = {
    gridColumnStart: dayOfSunday,
    backgroundColor: "white",
    height: "calc(100vh - 108px)",
  };

  //#endregion
  //#region code for each weekly visit dates

  function visitListWeeklyMonday() {
    return [...filteredDataWeeklyMonday]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }

  function visitListWeeklyTuesday() {
    return [...filteredDataWeeklyTuesday]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        // console.log(moment(visit.visitDate + ', ' + visit.hourOfVisit))
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }

  function visitListWeeklyWednesday() {
    return [...filteredDataWeeklyWed]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }

  function visitListWeeklyThursday() {
    return [...filteredDataWeeklyThursday]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }

  function visitListWeeklyFriday() {
    return [...filteredDataWeeklyFri]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))

      .map((visit) => {
        return (
          <VisitDaily
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        );
      });
  }
  //#endregion
  //#region code for monthly calendar create visits
  const month = getMonth(startOfTheMonth);
  const year = getYear(startOfTheMonth);
  const [selectedNumber, setSelectedNumber] = useState("");
  const day = selectedNumber;
  const [selectedDate, setSelectedDate] = useState("");
  const [weekendDay, setWeekendDay] = useState();
  const wekendSunday = isSunday(addDays(new Date(selectedDate), 1));
  const wekendSaturday = isSaturday(addDays(new Date(selectedDate), 1));

  const handleClick = (event) => {
    var target = event.target || event.srcElement;

    setSelectedNumber(target.innerText);

    handleMonthlyShow();

    setNewPatient(true);
  };
  useEffect(
    (e) => {
      let isSubscribed = true;
      const sel = new Date(year, month, day);
      const selectDate = format(sel, "yyyy-MM-dd");
      setSelectedDate(selectDate);
      setWeekendDay(wekendSaturday ? true : wekendSunday ? true : false);
      return () => (isSubscribed = false);
    },
    [year, month, day, wekendSaturday, wekendSunday]
  );

  //#endregion
  //#region for new table
  //table functions
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.gray,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  //pagination
  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filterDataWithDate.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //#endregion
  //#region for pulling the exceptions based on selected provider
  const [staffExceptions, setStaffExceptions] = useState([]);
  const exceptionMD = staffExceptions.filter(
    (doc) => doc.provider === selectExceptionMD
  ); // && (getMonth(new Date(doc.startDate)) + 1  >= getMonth(new Date(dateSelected)) + 1 && getMonth(new Date(doc.endDate)) + 1 <= getMonth(new Date(dateSelected))))
  // const exceptionMD = staffExceptions === [] ? 'Test User' : staffExceptions.filter((doc) => doc.provider === selectExceptionMD)
  const exceptionMonthOfDate = getMonth(new Date(dateSelected)) + 1;
  // const getDatesInRange = (min, max) => Array((max-min)/86400000).fill(0).map((_, i) => new Date((new Date()).setDate(min.getDate() + i)))

  console.log("month", exceptionMonthOfDate);

  // const {
  //   exceptionMon: exceptionMons,
  //   exceptionTues: exceptionTue,
  //   exceptionWed: exceptionWeds,
  //   exceptionThurs: exceptionThur,
  //   exceptionFri: exceptionFris,
  //   startDate: selectedExceptionMDStart,
  //   endDate: selectedExceptionMDEnd } = exceptionMD[1] === undefined ? 'Test User' : exceptionMD[1]
  const {
    exceptionMon: exceptionMons,
    exceptionTues: exceptionTue,
    exceptionWed: exceptionWeds,
    exceptionThurs: exceptionThur,
    exceptionFri: exceptionFris,
    startDate: selectedExceptionMDStart,
    endDate: selectedExceptionMDEnd,
  } = exceptionMD; //[1] === undefined ? "Test User" : exceptionMD[1];
  console.log(
    "exceptionMD",
    selectedExceptionMDStart //startDate //.findLast((doc) => doc.provider === selectExceptionMD)
  );
  // console.log('exceptionMon', exceptionMons, exceptionTue, exceptionWeds, exceptionThur, exceptionFris)
  const exceptionValue = [
    exceptionMons,
    exceptionTue,
    exceptionWeds,
    exceptionThur,
    exceptionFris,
  ];
  console.log(
    "exceptionValue",
    exceptionValue.includes("Mon") ? true : false,
    exceptionValue
  );
  // console.log(getDatesInRange(new Date(selectedExceptionMDStart), new Date(selectedExceptionMDEnd)))
  // console.log('exceptions', exceptionMD[0])
  // console.log('exceptions', exceptionMD.includes(exceptionMons) ? true : false)
  function isException(dateItem) {
    const isDayException =
      exceptionMons === format(addDays(new Date(dateItem), 1), "iii") ||
      exceptionTue === format(addDays(new Date(dateItem), 1), "iii") ||
      exceptionWeds === format(addDays(new Date(dateItem), 1), "iii") ||
      exceptionThur === format(addDays(new Date(dateItem), 1), "iii") ||
      exceptionFris === format(addDays(new Date(dateItem), 1), "iii")
        ? true
        : false;
    const isExcept =
      dateItem >= selectedExceptionMDStart && dateItem <= selectedExceptionMDEnd
        ? true
        : false;
    const isException = isDayException && isExcept ? true : false;
    // console.log(isDayException, exceptionMons === format(addDays(new Date(dateItem), 1), 'iii'), exceptionTue === format(addDays(new Date(dateItem), 1), 'iii'), exceptionWeds === format(addDays(new Date(dateItem), 1), 'iii'), exceptionThur === format(addDays(new Date(dateItem), 1), 'iii'), exceptionFris === format(addDays(new Date(dateItem), 1), 'iii'))
    return isException;
  }

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/exceptions")
      .then((response) => {
        const data = response.data;
        setStaffExceptions(data);
      })
      .catch((error) => {
        console.log("Error from exception list");
      });
  }, []);
  //#endregion
  //#region for pulling the schedules based on selected provider availability
  const [staffSchedules, setStaffSchedules] = useState([]);
  const availableMD = staffSchedules.filter(
    (doc) => doc.provider === selectAvailabilityMD
  );
  //provider below is used for props.provider
  const { provider } =
    availableMD[0] === undefined ? "Test User" : availableMD[0];

  const {
    scheduledMon: scheduledMons,
    scheduledTues: scheduledTue,
    scheduledWed: scheduledWeds,
    scheduledThurs: scheduledThur,
    scheduledFri: scheduledFris,
    // providerID: selectedAvailableMDID,
    startDate: selectedAvailableMDStart,
    endDate: selectedAvailableMDEnd,
  } = availableMD[0] === undefined ? "Test User" : availableMD[0];

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/schedules")
      .then((response) => {
        const data = response.data; //.find(doc => doc.name === availableMD)
        setStaffSchedules(data);
      })
      .catch((error) => {
        console.log("Error from schedule list");
      });
  }, []);

  const MonthDayDate1 = format(
    new Date(currentYear, monthIndex, startOfTheMonthDay),
    "yyyy-MM-dd"
  );
  const MonthDayDate2 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 1 > endOfTheMonthDay ? 1 : 2
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate3 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 2 > endOfTheMonthDay ? 1 : 3
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate4 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 3 > endOfTheMonthDay ? 1 : 4
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate5 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 4 > endOfTheMonthDay ? 1 : 5
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate6 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 5 > endOfTheMonthDay ? 1 : 6
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate7 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 6 > endOfTheMonthDay ? 1 : 7
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate8 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 7 > endOfTheMonthDay ? 1 : 8
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate9 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 8 > endOfTheMonthDay ? 1 : 9
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate10 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 9 > endOfTheMonthDay ? 1 : 10
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate11 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 10 > endOfTheMonthDay ? 1 : 11
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate12 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 11 > endOfTheMonthDay ? 1 : 12
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate13 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 12 > endOfTheMonthDay ? 1 : 13
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate14 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 13 > endOfTheMonthDay ? 1 : 14
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate15 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 14 > endOfTheMonthDay ? 1 : 15
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate16 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 15 > endOfTheMonthDay ? 1 : 16
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate17 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 16 > endOfTheMonthDay ? 1 : 17
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate18 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 17 > endOfTheMonthDay ? 1 : 18
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate19 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 18 > endOfTheMonthDay ? 1 : 19
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate20 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 19 > endOfTheMonthDay ? 1 : 20
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate21 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 20 > endOfTheMonthDay ? 1 : 21
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate22 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 21 > endOfTheMonthDay ? 1 : 22
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate23 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 22 > endOfTheMonthDay ? 1 : 23
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate24 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 23 > endOfTheMonthDay ? 1 : 24
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate25 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 24 > endOfTheMonthDay ? 1 : 25
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate26 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 25 > endOfTheMonthDay ? 1 : 26
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate27 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 26 > endOfTheMonthDay ? 1 : 27
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate28 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 27 > endOfTheMonthDay ? 1 : 28
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate29 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 28 > endOfTheMonthDay ? 1 : 29
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate30 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 29 > endOfTheMonthDay ? 1 : 30
    ),
    "yyyy-MM-dd"
  );
  const MonthDayDate31 = format(
    new Date(
      currentYear,
      monthIndex,
      startOfTheMonthDay + 30 > endOfTheMonthDay ? 1 : 31
    ),
    "yyyy-MM-dd"
  );

  function isScheduled(dateItem) {
    const isDayScheduled =
      scheduledMons === format(addDays(new Date(dateItem), 1), "iii") ||
      scheduledTue === format(addDays(new Date(dateItem), 1), "iii") ||
      scheduledWeds === format(addDays(new Date(dateItem), 1), "iii") ||
      scheduledThur === format(addDays(new Date(dateItem), 1), "iii") ||
      scheduledFris === format(addDays(new Date(dateItem), 1), "iii")
        ? true
        : false;
    const isSchedule =
      dateItem >= selectedAvailableMDStart && dateItem <= selectedAvailableMDEnd
        ? true
        : false;
    const isScheduled = isDayScheduled && isSchedule ? true : false;
    return isScheduled;
  }

  //Weekly
  // const WeekDayDate1 = format(new Date(startOfTheWeekDate), 'yyyy-MM-dd') //Sunday
  const WeekDayDate2 = format(
    addDays(new Date(startOfTheWeekDate), 1),
    "yyyy-MM-dd"
  ); //Monday
  const WeekDayDate3 = format(
    addDays(new Date(startOfTheWeekDate), 2),
    "yyyy-MM-dd"
  ); //Tuesday
  const WeekDayDate4 = format(
    addDays(new Date(startOfTheWeekDate), 3),
    "yyyy-MM-dd"
  ); //Wednesday
  const WeekDayDate5 = format(
    addDays(new Date(startOfTheWeekDate), 4),
    "yyyy-MM-dd"
  ); //Thursday
  const WeekDayDate6 = format(
    addDays(new Date(startOfTheWeekDate), 5),
    "yyyy-MM-dd"
  ); //Friday
  const WeekDayDate7 = format(
    addDays(new Date(startOfTheWeekDate), 6),
    "yyyy-MM-dd"
  );

  //#endregion
  //#region for delete confirmation modal
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const DeleteVisitModal = (props) => (
    <>
      <Modal show={showDelete} onHide={handleCloseDelete} size="sm" centered>
        <Modal.Header>
          <Modal.Title>Delete Visit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <b>Are you sure you want to delete this data item?</b>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={() => deleteRecord(visitID)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  //Function to display delete registration modal
  function displayDeleteRegistrationModal() {
    return <DeleteVisitModal />;
  }

  //#endregion
  //#region to hide navbar
  const [showNav, setShowNav] = useState(false);
  function toggleNav() {
    setShowNav(!showNav);
  }

  //#endregion
  //#region check in and check out codes

  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [checkInValue, setCheckInValue] = useState(false);
  const [checkOutValue, setCheckOutValue] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/visits/${visitID}`)
      .then((res) => {
        setVisit({
          medicalRecordNumber: res.data.medicalRecordNumber,
          visitNumber: res.data.visitNumber,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          middleName: res.data.middleName,
          email: res.data.email,
          addedDate: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
          visitDate: res.data.visitDate,
          hourOfVisit: res.data.hourOfVisit,
          provider: res.data.provider,
          event: res.data.event,
          cellphone: res.data.cellphone,
          checkIn: checkInTime,
          checkOut: checkOutTime,
        });
      })
      .catch((err) => {
        console.log("Error from UpdateVisitInfo");
      });
  }, [checkInTime, checkOutTime, visitID]);

  function checkedIn(e) {
    // setCheckIn(() => {
    setCheckInTime(format(new Date(), "hh:mm:ss a"));
    setCheckInValue(!checkInValue);
    // })
    setVisit({ ...visit, [e.target.name]: checkInTime });

    axios
      .put(`http://localhost:8081/api/visits/${visitID}`, visit)
      .catch((err) => {
        console.log("Error in UpdateVisitInfo!");
      });
  }

  function checkedOut(e) {
    setCheckOutTime(format(new Date(), "hh:mm:ss a"));
    setCheckOutValue(!checkOutValue);
    setVisit({ ...visit, [e.target.name]: checkOutTime });

    axios
      .put(`http://localhost:8081/api/visits/${visitID}`, visit)
      .catch((err) => {
        console.log("Error in UpdateVisitInfo!");
      });
  }

  console.log(checkInTime, checkOutTime);
  //create initial STATE for visit object
  const [visit, setVisit] = useState({
    medicalRecordNumber: "",
    visitNumber: "",
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    addedDate: "",
    visitDate: "",
    provider: "",
    hourOfVisit: "",
    event: "",
    cellphone: "",
    checkIn: "",
    checkOut: "",
  });
  // console.log(visit, visitID)

  // const [data, setData] = useState([])
  // const newdata = {
  //   medicalRecordNumber: visit.medicalRecordNumber,
  //   visitNumber: visit.visitNumber,
  //   firstName: visit.firstName,
  //   lastName: visit.lastName,
  //   middleName: visit.middleName,
  //   email: visit.email,
  //   addedDate: visit.addedDate,
  //   visitDate: visit.visitDate,
  //   hourOfVisit: visit.hourOfVisit,
  //   provider: visit.provider,
  //   event: visit.event,
  //   cellphone: visit.cellphone,
  // }

  // setData(data)

  // console.log('checkIn', checkIn, 'checkOut', checkOut, checkInValue)
  //#endregion

  return (
    <div className="grid_containerx">
      {/* style={{ display: 'flex', flexDirection: 'column' }} 
      style={{ position: 'sticky', top: '0', width: '100%' }}*/}
      <div className="item1x">
        <Header />
      </div>
      <div className="item2and3Conatainer">
        <div
          className="item2"
          style={{ display: showNav === true ? "inline" : "none" }}
        >
          <Navbar />
        </div>
        <div className="item2">
          <button className="btn-sm btn">
            {" "}
            <i
              className="fa fa-exchange fa-sm fawhite"
              aria-hidden="true"
              onClick={toggleNav}
              title="Toggle navigation"
            ></i>
          </button>
        </div>
        <div className="item3">
          <div ref={componentToPrintRef} className="grid_calendar">
            <div className="itemCalendar1 ">
              {/* <div style={{ display: 'flex' }}> */}
              {/* className="month-indicator item3C" */}
              <div>
                <h4 className="patientListHeader divLabelWidth">
                  {monthName}
                  {/* Hello!! {userx} */}
                </h4>
              </div>
              <div className="customDatePickerWidth searchLabel select">
                {/* */}

                <DatePicker
                  selected={showDateValue}
                  className="selectlabel"
                  value={showDateValue}
                  onChange={(newValue) => {
                    setShowDateValue(newValue);
                  }}
                  monthsShown={2}
                  todayButton="Today"
                />
              </div>
              <div className=" searchLabel ">
                {/* viewlabel */}

                <select
                  key={selectViewValue}
                  className="selectlabel"
                  id="calendarView"
                  value={selectViewValue}
                  onChange={viewValueChange}
                >
                  {viewValues.map((viewval) => (
                    <option key={viewval.name} value={viewval.value}>
                      {viewval.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="divLabelWidth">
                <div>
                  <img
                    className="directionArrows"
                    src={backward}
                    alt="backward"
                    onClick={(newValue) =>
                      selectViewValue === "Monthly"
                        ? setShowDateValue(addDays(showDateValue, -31))
                        : selectViewValue === "Weekly"
                        ? setShowDateValue(addDays(showDateValue, -7))
                        : selectViewValue === "Daily"
                        ? setShowDateValue(addDays(showDateValue, -1))
                        : setShowDateValue(showDateValue)
                    }
                  ></img>
                </div>
                <div>
                  <img
                    className="directionArrows"
                    src={forward}
                    alt="forward"
                    onClick={(newValue) =>
                      selectViewValue === "Monthly"
                        ? setShowDateValue(addMonths(showDateValue, 1))
                        : selectViewValue === "Weekly"
                        ? setShowDateValue(addWeeks(showDateValue, 1))
                        : selectViewValue === "Daily"
                        ? setShowDateValue(addDays(showDateValue, 1))
                        : setShowDateValue(showDateValue)
                    }
                  ></img>
                </div>
              </div>
              <div className="divLabelWidth">
                <Button
                  className="btn-sm btn-smTopMargin"
                  onClick={handleClick}
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Add Visit"
                  style={{
                    display: selectViewValue === "Monthly" ? "none" : "",
                    marginTop: "2px",
                  }}
                >
                  <i className="fa fa-solid fa-plus"></i>
                </Button>
                <div>{displayVisitModal()}</div>
              </div>
              {/* modal end*/}
              {/* provider availability start */}
              <div className="divLabelWidth">
                {/* className="searchLabels viewlabels" */}
                <label>
                  {/* Provider: */}
                  <select
                    key={visits.provider}
                    className="selectlabel"
                    name="provider"
                    value={visits.provider}
                    onChange={(e) => {
                      setSelectAvailabilityMD(e.target.value);
                      setSelectExceptionMD(e.target.value);
                    }}
                  >
                    {" "}
                    <option key="Select" value="">
                      Select Provider for Availability
                    </option>
                    {providerMD.map((doc) => (
                      <option id={doc._id} key={doc._id} value={doc._id}>
                        {doc}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {/* provider end */}
              {/* search start */}

              <div className="div-items">
                <div className="searchButton">
                  <a
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Search for Visit"
                    href="/visitlist"
                    className="searchlabel"
                    role="button"
                  >
                    Search Visits{" "}
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </a>
                </div>
                <div>
                  <ReactToPrint
                    trigger={() => (
                      <button className="searchButton">
                        <i
                          className="fa fa-print"
                          aria-hidden="true"
                          title="Print"
                        ></i>
                      </button>
                    )}
                    content={() => componentToPrintRef.current}
                  />
                </div>
              </div>

              {/* search end */}
            </div>

            <div>{displayVisitMonthlyModal()}</div>
            <div>{displayDeleteRegistrationModal()}</div>
            <div>{displayEditVisitModal()}</div>
            <div>{displayDetailVisitModal()}</div>
            <div>{displayShowSMSMessageModal()}</div>
            <div>{displayShowEmailMessageModal()}</div>
            <div className="itemCalendar2">
              {/* monthly */}
              <div
                className="monthly"
                style={{
                  display: selectViewValue === "Monthly" ? "" : "none",
                  paddingLeft: "0px",
                  marginBottom: "0px",
                }}
              >
                <div className="weekDayTitleParent">
                  <div id="weekDayTitleChild" className="weekDayTitleChild">
                    Sun
                  </div>
                  <div
                    className="weekDayTitleChild"
                    // onClick={() => {
                    //   alert.show('Oh look, an alert!')
                    // }}
                  >
                    Mon
                  </div>
                  <div className="weekDayTitleChild">Tue</div>
                  <div className="weekDayTitleChild">Wed</div>
                  <div className="weekDayTitleChild">Thu</div>
                  <div className="weekDayTitleChild">Fri</div>
                  <div className="weekDayTitleChild">Sat</div>
                </div>
                <div style={{ overflowY: "auto" }}>
                  <div className="monthDayTitleParent">
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate1), 1)
                        )
                          ? "none"
                          : "auto",
                        gridColumnStart: startOfTheMonthDayNumber + 1,
                        backgroundColor: isScheduled(MonthDayDate1)
                          ? isWeekend(addDays(new Date(MonthDayDate1), 1)) ||
                            isException(MonthDayDate1)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay
                            )
                          );
                        }}
                      >
                        <span id="day1" className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal "
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      <div>{visitListMonthlyDay1()}</div>
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate2), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate2)
                          ? isWeekend(addDays(new Date(MonthDayDate2), 1)) ||
                            isException(MonthDayDate2)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 1 > endOfTheMonthDay ? 1 : 2
                            )
                          );
                        }}
                      >
                        <span id="day2" className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 1 > endOfTheMonthDay ? 1 : 2}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay2()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate3), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate3)
                          ? isWeekend(addDays(new Date(MonthDayDate3), 1)) ||
                            isException(MonthDayDate3)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 2 > endOfTheMonthDay ? 1 : 3
                            )
                          );
                        }}
                      >
                        <span className="day" id="day3">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 2 > endOfTheMonthDay ? 1 : 3}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay3()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate4), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate4)
                          ? isWeekend(addDays(new Date(MonthDayDate4), 1)) ||
                            isException(MonthDayDate4)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 3 > endOfTheMonthDay ? 1 : 4
                            )
                          );
                        }}
                      >
                        <span className="day" id="day4">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 3 > endOfTheMonthDay ? 1 : 4}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay4()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate5), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate5)
                          ? isWeekend(addDays(new Date(MonthDayDate5), 1)) ||
                            isException(MonthDayDate5)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 4 > endOfTheMonthDay ? 1 : 5
                            )
                          );
                        }}
                      >
                        <span className="day" id="day5">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 4 > endOfTheMonthDay ? 1 : 5}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay5()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate6), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate6)
                          ? isWeekend(addDays(new Date(MonthDayDate6), 1)) ||
                            isException(MonthDayDate6)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 5 > endOfTheMonthDay ? 1 : 6
                            )
                          );
                        }}
                      >
                        <span className="day" id="day6">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 5 > endOfTheMonthDay ? 1 : 6}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay6()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate7), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate7)
                          ? isWeekend(addDays(new Date(MonthDayDate7), 1)) ||
                            isException(MonthDayDate7)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 6 > endOfTheMonthDay ? 1 : 7
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 6 > endOfTheMonthDay ? 1 : 7}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay7()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate8), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate8)
                          ? isWeekend(addDays(new Date(MonthDayDate8), 1)) ||
                            isException(MonthDayDate8)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 7 > endOfTheMonthDay ? 1 : 8
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 7 > endOfTheMonthDay ? 1 : 8}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay8()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate9), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate9)
                          ? isWeekend(addDays(new Date(MonthDayDate9), 1)) ||
                            isException(MonthDayDate9)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 8 > endOfTheMonthDay ? 1 : 9
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 8 > endOfTheMonthDay ? 1 : 9}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay9()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate10), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate10)
                          ? isWeekend(addDays(new Date(MonthDayDate10), 1)) ||
                            isException(MonthDayDate10)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 9 > endOfTheMonthDay ? 1 : 10
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 9 > endOfTheMonthDay ? 1 : 10}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay10()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate11), 1)
                        )
                          ? "none"
                          : "auto",

                        backgroundColor: isScheduled(MonthDayDate11)
                          ? isWeekend(addDays(new Date(MonthDayDate11), 1)) ||
                            isException(MonthDayDate11)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 10 > endOfTheMonthDay
                                ? 1
                                : 11
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 10 > endOfTheMonthDay
                              ? 1
                              : 11}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay11()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate12), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate12)
                          ? isWeekend(addDays(new Date(MonthDayDate12), 1)) ||
                            isException(MonthDayDate12)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 11 > endOfTheMonthDay
                                ? 1
                                : 12
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 11 > endOfTheMonthDay
                              ? 1
                              : 12}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay12()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate13), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate13)
                          ? isWeekend(addDays(new Date(MonthDayDate13), 1)) ||
                            isException(MonthDayDate13)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 12 > endOfTheMonthDay
                                ? 1
                                : 13
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 12 > endOfTheMonthDay
                              ? 1
                              : 13}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay13()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate14), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate14)
                          ? isWeekend(addDays(new Date(MonthDayDate14), 1)) ||
                            isException(MonthDayDate14)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 13 > endOfTheMonthDay
                                ? 1
                                : 14
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 13 > endOfTheMonthDay
                              ? 1
                              : 14}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay14()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate15), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate15)
                          ? isWeekend(addDays(new Date(MonthDayDate15), 1)) ||
                            isException(MonthDayDate15)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 14 > endOfTheMonthDay
                                ? 1
                                : 15
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 14 > endOfTheMonthDay
                              ? 1
                              : 15}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay15()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate16), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate16)
                          ? isWeekend(addDays(new Date(MonthDayDate16), 1)) ||
                            isException(MonthDayDate16)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 15 > endOfTheMonthDay
                                ? 1
                                : 16
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 15 > endOfTheMonthDay
                              ? 1
                              : 16}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay16()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate17), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate17)
                          ? isWeekend(addDays(new Date(MonthDayDate17), 1)) ||
                            isException(MonthDayDate17)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 16 > endOfTheMonthDay
                                ? 1
                                : 17
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 16 > endOfTheMonthDay
                              ? 1
                              : 17}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay17()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate18), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate18)
                          ? isWeekend(addDays(new Date(MonthDayDate18), 1)) ||
                            isException(MonthDayDate18)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 17 > endOfTheMonthDay
                                ? 1
                                : 18
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 17 > endOfTheMonthDay
                              ? 1
                              : 18}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay18()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate19), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate19)
                          ? isWeekend(addDays(new Date(MonthDayDate19), 1)) ||
                            isException(MonthDayDate19)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 18 > endOfTheMonthDay
                                ? 1
                                : 19
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 18 > endOfTheMonthDay
                              ? 1
                              : 19}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay19()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate20), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate20)
                          ? isWeekend(addDays(new Date(MonthDayDate20), 1)) ||
                            isException(MonthDayDate20)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 19 > endOfTheMonthDay
                                ? 1
                                : 20
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 19 > endOfTheMonthDay
                              ? 1
                              : 20}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay20()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate21), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate21)
                          ? isWeekend(addDays(new Date(MonthDayDate21), 1)) ||
                            isException(MonthDayDate21)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 20 > endOfTheMonthDay
                                ? 1
                                : 21
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 20 > endOfTheMonthDay
                              ? 1
                              : 21}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay21()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate22), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate22)
                          ? isWeekend(addDays(new Date(MonthDayDate22), 1)) ||
                            isException(MonthDayDate22)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 21 > endOfTheMonthDay
                                ? 1
                                : 22
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 21 > endOfTheMonthDay
                              ? 1
                              : 22}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay22()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate23), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate23)
                          ? isWeekend(addDays(new Date(MonthDayDate23), 1)) ||
                            isException(MonthDayDate23)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 22 > endOfTheMonthDay
                                ? 1
                                : 23
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 22 > endOfTheMonthDay
                              ? 1
                              : 23}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay23()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate24), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate24)
                          ? isWeekend(addDays(new Date(MonthDayDate24), 1)) ||
                            isException(MonthDayDate24)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 23 > endOfTheMonthDay
                                ? 1
                                : 24
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 23 > endOfTheMonthDay
                              ? 1
                              : 24}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay24()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate25), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate25)
                          ? isWeekend(addDays(new Date(MonthDayDate25), 1)) ||
                            isException(MonthDayDate25)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 24 > endOfTheMonthDay
                                ? 1
                                : 25
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 24 > endOfTheMonthDay
                              ? 1
                              : 25}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay25()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate26), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate26)
                          ? isWeekend(addDays(new Date(MonthDayDate26), 1)) ||
                            isException(MonthDayDate26)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 25 > endOfTheMonthDay
                                ? 1
                                : 26
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 25 > endOfTheMonthDay
                              ? 1
                              : 26}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay26()}
                    </div>

                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate27), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate27)
                          ? isWeekend(addDays(new Date(MonthDayDate27), 1)) ||
                            isException(MonthDayDate27)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 26 > endOfTheMonthDay
                                ? 1
                                : 27
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 26 > endOfTheMonthDay
                              ? 1
                              : 27}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay27()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate28), 1)
                        )
                          ? "none"
                          : "auto",
                        backgroundColor: isScheduled(MonthDayDate28)
                          ? isWeekend(addDays(new Date(MonthDayDate28), 1)) ||
                            isException(MonthDayDate28)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 27 > endOfTheMonthDay
                                ? 1
                                : 28
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 27 > endOfTheMonthDay
                              ? 1
                              : 28}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay28()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate29), 1)
                        )
                          ? "none"
                          : "auto",
                        display:
                          startOfTheMonthDay + 28 > endOfTheMonthDay
                            ? "none"
                            : "inline",
                        backgroundColor: isScheduled(MonthDayDate29)
                          ? isWeekend(addDays(new Date(MonthDayDate29), 1)) ||
                            isException(MonthDayDate29)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 28 > endOfTheMonthDay
                                ? 1
                                : 29
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 28 > endOfTheMonthDay
                              ? 1
                              : 29}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay29()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate30), 1)
                        )
                          ? "none"
                          : "auto",
                        display:
                          startOfTheMonthDay + 29 > endOfTheMonthDay
                            ? "none"
                            : "inline",
                        backgroundColor: isScheduled(MonthDayDate30)
                          ? isWeekend(addDays(new Date(MonthDayDate30), 1)) ||
                            isException(MonthDayDate30)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 29 > endOfTheMonthDay
                                ? 1
                                : 30
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 29 > endOfTheMonthDay
                              ? 1
                              : 30}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay30()}
                    </div>
                    <div
                      className="monthDayTitleChild"
                      style={{
                        pointerEvents: isWeekend(
                          addDays(new Date(MonthDayDate31), 1)
                        )
                          ? "none"
                          : "auto",
                        display:
                          startOfTheMonthDay + 30 > endOfTheMonthDay
                            ? "none"
                            : "inline",
                        backgroundColor: isScheduled(MonthDayDate31)
                          ? isWeekend(addDays(new Date(MonthDayDate31), 1)) ||
                            isException(MonthDayDate31)
                            ? "#ffdbe6"
                            : "#ebfcec"
                          : "white",
                      }}
                    >
                      <div
                        className="dailySpanContainer"
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheMonthDay + 30 > endOfTheMonthDay
                                ? 1
                                : 31
                            )
                          );
                        }}
                      >
                        <span className="day">
                          <button
                            style={{
                              fontSize: "10px",
                              paddingTop: "1px",
                              paddingBottom: "1px",
                              borderRadius: "10px",
                            }}
                            className="btn calendarBtn btn-smCal"
                            onClick={handleClick}
                            title="Click to add visit"
                          >
                            {startOfTheMonthDay + 30 > endOfTheMonthDay
                              ? 1
                              : 31}
                          </button>
                          <div className="dailySpanContainerItems">
                            {" "}
                            Click for daily view
                          </div>
                        </span>
                      </div>
                      {visitListMonthlyDay31()}
                    </div>
                  </div>
                </div>
              </div>
              {/* Weekly  */}
              <div
                className="weekly"
                style={{
                  // pointerEvents: isWeekend(addDays(new Date(MonthDayDate5), 1)) ? 'none' : 'auto',
                  display: selectViewValue === "Weekly" ? "inline" : "none",
                  paddingLeft: "0px",
                  marginBottom: "0px",
                  height: "100%",
                  // backgroundColor: isScheduled(MonthDayDate31) ? '#ebfcec' : 'white',
                }}
              >
                <div className="grid-weeklycalcontainer">
                  <div
                    style={{
                      fontSize: "14px",
                      // height: 'calc(100vh - 132px)',
                      height: "100%",
                      // backgroundColor: isScheduled(WeekDayDate2) ? isWeekend(addDays(new Date(WeekDayDate2), 1)) || isException(MonthDayDate1) ? 'white' : '#ebfcec' : 'white',
                    }}
                  >
                    <li className="calendar-item weekday">
                      <div>
                        SUN
                        <span style={{ float: "right", marginRight: "10px" }}>
                          {startOfTheWeek}
                        </span>
                      </div>
                    </li>
                    <li
                      className="calendar-item calendar-day"
                      style={gridWeeklyStartSun}
                    ></li>
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      // height: 'calc(100vh - 132px)',
                      height: "100%",
                      backgroundColor: isScheduled(WeekDayDate2)
                        ? isWeekend(addDays(new Date(WeekDayDate2), 1)) ||
                          isException(WeekDayDate2)
                          ? "#ffdbe6"
                          : "#ebfcec"
                        : "white",
                    }}
                  >
                    <li className="calendar-item weekday">
                      <div
                        onClick={() => {
                          setViewValue("Daily");
                          setShowDateValue(
                            new Date(
                              currentYear,
                              monthIndex,
                              startOfTheWeek + 1 > startOfTheWeekEndOfMonth &&
                              startOfTheWeek + 1 - startOfTheWeekEndOfMonth >= 1
                                ? startOfTheWeek + 1 - startOfTheWeekEndOfMonth
                                : startOfTheWeek + 1
                            )
                          );
                        }}
                      >
                        MON
                        <span
                          style={{
                            float: "right",
                            marginRight: "10px",
                          }}
                        >
                          {startOfTheWeek + 1 > startOfTheWeekEndOfMonth &&
                          startOfTheWeek + 1 - startOfTheWeekEndOfMonth >= 1
                            ? startOfTheWeek + 1 - startOfTheWeekEndOfMonth
                            : startOfTheWeek + 1}
                        </span>
                      </div>
                    </li>
                    <li className="calendar-item calendar-day">
                      {visitListWeeklyMonday()}
                    </li>
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      height: "100%",
                      backgroundColor: isScheduled(WeekDayDate3)
                        ? isWeekend(addDays(new Date(WeekDayDate3), 1)) ||
                          isException(WeekDayDate3)
                          ? "#ffdbe6"
                          : "#ebfcec"
                        : "white",
                    }}
                  >
                    <li
                      className="calendar-item weekday"
                      onClick={() => {
                        setViewValue("Daily");
                        setShowDateValue(
                          new Date(
                            currentYear,
                            monthIndex,
                            startOfTheWeek + 2 > startOfTheWeekEndOfMonth &&
                            startOfTheWeek + 2 - startOfTheWeekEndOfMonth >= 1
                              ? startOfTheWeek + 2 - startOfTheWeekEndOfMonth
                              : startOfTheWeek + 2
                          )
                        );
                      }}
                    >
                      <div>
                        TUE
                        <span style={{ float: "right", marginRight: "10px" }}>
                          {startOfTheWeek + 2 > startOfTheWeekEndOfMonth &&
                          startOfTheWeek + 2 - startOfTheWeekEndOfMonth >= 1
                            ? startOfTheWeek + 2 - startOfTheWeekEndOfMonth
                            : startOfTheWeek + 2}
                        </span>
                      </div>
                    </li>
                    <li className="calendar-item calendar-day">
                      {visitListWeeklyTuesday()}
                    </li>
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      height: "100%",
                      backgroundColor: isScheduled(WeekDayDate4)
                        ? isWeekend(addDays(new Date(WeekDayDate4), 1)) ||
                          isException(WeekDayDate4)
                          ? "#ffdbe6"
                          : "#ebfcec"
                        : "white",
                    }}
                  >
                    <li
                      className="calendar-item weekday"
                      onClick={() => {
                        setViewValue("Daily");
                        setShowDateValue(
                          new Date(
                            currentYear,
                            monthIndex,
                            startOfTheWeek + 3 > startOfTheWeekEndOfMonth &&
                            startOfTheWeek + 3 - startOfTheWeekEndOfMonth >= 1
                              ? startOfTheWeek + 3 - startOfTheWeekEndOfMonth
                              : startOfTheWeek + 3
                          )
                        );
                      }}
                    >
                      <div>
                        WED
                        <span style={{ float: "right", marginRight: "10px" }}>
                          {startOfTheWeek + 3 > startOfTheWeekEndOfMonth &&
                          startOfTheWeek + 3 - startOfTheWeekEndOfMonth >= 1
                            ? startOfTheWeek + 3 - startOfTheWeekEndOfMonth
                            : startOfTheWeek + 3}
                          {/* {console.log(startOfTheWeek

                          , startOfTheWeek + 3
                          , startOfTheWeekEndOfMonth,
                          startOfTheWeek + 3 - startOfTheWeekEndOfMonth)} */}
                        </span>
                      </div>
                    </li>
                    <li className="calendar-item calendar-day">
                      {visitListWeeklyWednesday()}
                      {/* {console.log(startOfTheWeek + 3 > startOfTheWeekEndOfMonth
                          ? 1
                          : startOfTheWeek + 3, startOfTheWeek + 3)} */}
                    </li>
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      height: "100%",
                      backgroundColor: isScheduled(WeekDayDate5)
                        ? isWeekend(addDays(new Date(WeekDayDate5), 1)) ||
                          isException(WeekDayDate5)
                          ? "#ffdbe6"
                          : "#ebfcec"
                        : "white",
                    }}
                  >
                    <li
                      className="calendar-item weekday"
                      onClick={() => {
                        setViewValue("Daily");
                        setShowDateValue(
                          new Date(
                            currentYear,
                            monthIndex,
                            startOfTheWeek + 4 > startOfTheWeekEndOfMonth &&
                            startOfTheWeek + 4 - startOfTheWeekEndOfMonth >= 1
                              ? startOfTheWeek + 4 - startOfTheWeekEndOfMonth
                              : startOfTheWeek + 4
                          )
                        );
                      }}
                    >
                      <div>
                        THU
                        <span style={{ float: "right", marginRight: "10px" }}>
                          {startOfTheWeek + 4 > startOfTheWeekEndOfMonth &&
                          startOfTheWeek + 4 - startOfTheWeekEndOfMonth >= 1
                            ? startOfTheWeek + 4 - startOfTheWeekEndOfMonth
                            : startOfTheWeek + 4}
                        </span>
                      </div>
                    </li>
                    <li className="calendar-item calendar-day">
                      {/* style={gridWeekly} */}
                      {visitListWeeklyThursday()}
                    </li>
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      height: "100%",
                      backgroundColor: isScheduled(WeekDayDate6)
                        ? isWeekend(addDays(new Date(WeekDayDate6), 1)) ||
                          isException(WeekDayDate6)
                          ? "#ffdbe6"
                          : "#ebfcec"
                        : "white",
                    }}
                  >
                    <li
                      className="calendar-item weekday"
                      onClick={() => {
                        setViewValue("Daily");
                        setShowDateValue(
                          new Date(
                            currentYear,
                            monthIndex,
                            startOfTheWeek + 4 > startOfTheWeekEndOfMonth &&
                            startOfTheWeek + 4 - startOfTheWeekEndOfMonth >= 1
                              ? startOfTheWeek + 4 - startOfTheWeekEndOfMonth
                              : startOfTheWeek + 4
                          )
                        );
                      }}
                    >
                      <div>
                        FRI
                        <span style={{ float: "right", marginRight: "10px" }}>
                          {startOfTheWeek + 5 > startOfTheWeekEndOfMonth &&
                          startOfTheWeek + 5 - startOfTheWeekEndOfMonth >= 1
                            ? startOfTheWeek + 5 - startOfTheWeekEndOfMonth
                            : startOfTheWeek + 5}
                        </span>
                      </div>
                    </li>

                    <li className="calendar-item calendar-day">
                      {visitListWeeklyFriday()}
                      {/* {console.log(WeekDayDate6)} */}
                    </li>
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      height: "100%",
                      backgroundColor: isScheduled(WeekDayDate7)
                        ? isWeekend(addDays(new Date(WeekDayDate7), 1)) ||
                          isException(WeekDayDate7)
                          ? "#ffdbe6"
                          : "#ebfcec"
                        : "white",
                    }}
                  >
                    <li className="calendar-item weekday">
                      <div>
                        SAT
                        <span style={{ float: "right", marginRight: "10px" }}>
                          {startOfTheWeek + 6 > startOfTheWeekEndOfMonth &&
                          startOfTheWeek + 6 - startOfTheWeekEndOfMonth >= 1
                            ? startOfTheWeek + 6 - startOfTheWeekEndOfMonth
                            : startOfTheWeek + 6}
                        </span>
                      </div>
                    </li>
                    <li
                      className="calendar-item calendar-day"
                      style={gridWeekly}
                    ></li>
                  </div>
                </div>
              </div>
              {/* Daily  */}
              <div
                className="daily"
                style={{
                  display: selectViewValue === "Daily" ? "" : "none",
                  columnSpan: "all",
                }}
              >
                <li
                  className="calendar-item calendar-day"
                  id="calendarDaily"
                  style={gridWeeklyStart}
                >
                  <div className="calendarDailyDate" id="calendarDailyDate">
                    <h5 className="calendarDailyDateHeader">
                      {format(new Date(showDateValue.toLocaleString()), "PPP")}
                    </h5>
                  </div>

                  <div>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 650 }}
                        size="small"
                        aria-label="a dense table"
                        // className='table-striped'
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="left">
                              Visit
                            </StyledTableCell>
                            <StyledTableCell align="left">Time</StyledTableCell>
                            <StyledTableCell align="left">MRN</StyledTableCell>
                            <StyledTableCell align="left">
                              Visit ID
                            </StyledTableCell>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            {/* <StyledTableCell align="left">
                              Middlename
                            </StyledTableCell> */}
                            {/* <StyledTableCell align="left">
                              Lastname
                            </StyledTableCell> */}
                            <StyledTableCell align="left">
                              Email
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              Provider
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              Date Added
                            </StyledTableCell>
                            {/* <StyledTableCell align="left">
                              Check In
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              Check Out
                            </StyledTableCell> */}
                            <StyledTableCell align="left">
                              Actions
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {(rowsPerPage > 0
                            ? filterDataWithDate.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : filterDataWithDate
                          ).map((pt) => (
                            <StyledTableRow
                              key={pt._id}
                              onClick={() => handleItemClick(pt)}
                            >
                              <StyledTableCell align="left">
                                {pt.visitDate}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {pt.hourOfVisit}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {pt.medicalRecordNumber}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {pt.visitNumber}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {pt.firstName + " " + pt.lastName}
                              </StyledTableCell>
                              {/* <StyledTableCell align="left">
                                {pt.middleName}
                              </StyledTableCell> */}
                              {/* <StyledTableCell align="left">
                                {pt.lastName}
                              </StyledTableCell> */}

                              <StyledTableCell align="left">
                                {pt.email}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {pt.provider}
                              </StyledTableCell>
                              <StyledTableCell align="left" width={"200px"}>
                                {pt.addedDate}
                              </StyledTableCell>
                              {/* <StyledTableCell align="left" width={'100px'}>
                                <div>                              
                                  <Checkbox checked={checkInValue} onClick={checkedIn} />
                                </div>
                              </StyledTableCell>
                              <StyledTableCell align="left" width={'100px'}>
                                <div>
                                  <Checkbox checked={checkOutValue} onClick={checkedOut} />
                                </div>
                              </StyledTableCell> */}
                              <StyledTableCell align="left" width={"250px"}>
                                <button
                                  className="btn btn-info btn-sm"
                                  onClick={() => {
                                    handleEmailMessageShow(pt._id);
                                  }}
                                >
                                  <i
                                    className="fa fa-envelope"
                                    aria-hidden="true"
                                    title="Send email"
                                  ></i>
                                </button>
                                <button
                                  className="btn btn-info btn-sm"
                                  onClick={() => {
                                    handleSMSMessageShow(pt._id);
                                  }}
                                >
                                  <i
                                    className="fa fa-commenting-o"
                                    aria-hidden="true"
                                    title="Send message"
                                  ></i>
                                </button>
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={() => {
                                    handleEditVisitShow(pt._id);
                                  }}
                                >
                                  <i
                                    className="fa fa-pencil"
                                    aria-hidden="true"
                                    title="edit visit"
                                  />
                                </button>
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() => {
                                    handleDetailVisitShow(pt._id);
                                  }}
                                >
                                  <i
                                    className="fa fa-pencil-square-o"
                                    aria-hidden="true"
                                    title="Visit details"
                                  />
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={handleShowDelete}
                                >
                                  <i
                                    title="delete visit"
                                    className="fa fa-trash-o"
                                    aria-hidden="true"
                                  />
                                </button>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                          {emptyRows > 0 && (
                            <StyledTableRow
                              style={{
                                height: 53 * emptyRows,
                              }}
                            >
                              <StyledTableCell colSpan={6} />
                            </StyledTableRow>
                          )}
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                            <TablePagination
                              // style={{float:'right'}}
                              rowsPerPageOptions={[
                                5,
                                10,
                                25,
                                { label: "All", value: -1 },
                              ]}
                              colSpan={12}
                              count={filterDataWithDate.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              SelectProps={{
                                inputProps: {
                                  "aria-label": "rows per page",
                                },
                                native: true,
                              }}
                              onPageChange={handleChangePage}
                              onRowsPerPageChange={handleChangeRowsPerPage}
                              ActionsComponent={TablePaginationActions}
                            />
                          </TableRow>
                        </TableFooter>
                      </Table>
                    </TableContainer>
                  </div>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
