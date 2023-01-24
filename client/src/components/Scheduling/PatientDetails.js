import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer'
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  // Text: {
  //   fontSize: 8,
  // },
  viewer: {
    width: '100%', //window.innerWidth, //the pdf viewer will take up all of the width and height
    height: '880px',
  },
})

// Create Document Component
//   function BasicDocument(props) {
const PatientDetails = (props) => {
  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            
              <Text
                style={{ fontSize: '10px' }}
              >
                Patient Visit Details
              </Text>
            
            <Text style={{ fontSize: '10px' }}>
              Patient Name: {props.visit.firstName} {props.visit.middleName}{' '}
              {props.visit.lastName}
            </Text>
            <Text
                style={{ fontSize: '10px' }}
              >
                Email
              </Text>
            
            <Text style={{ fontSize: '10px' }}>
              Email: {props.visit.email}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={{ fontSize: '10px' }}>Appointment Date and Time</Text>
            <Text style={{ fontSize: '10px' }}>
              Visit Date: {props.visit.visitDate} {props.visit.hourOfVisit}
            </Text>
            <Text style={{ fontSize: '10px' }}>Provider</Text>
            <Text style={{ fontSize: '10px' }}>
              Physician: {props.visit.provider} 
            </Text>
          </View>
        </Page>
      </Document>
      {/* <div className="patientDetails">
      <div className="patientDetailsDemographics">
        {' '}
        <div>
          <h6>Patient Name </h6>
          {props.visit.firstName} {props.visit.middleName}{' '}
          {props.visit.lastName}
        </div>{' '}
        <div>
          <h6>Email</h6>
          {props.visit.email}
        </div>
      </div>
      <div className="patientDetailsDemographics">
        {' '}
        <div>
          <h6>Appointment Date & Time </h6>
          {props.visit.visitDate} {props.visit.hourOfVisit}
        </div>
        <div>
          <h6>Provider</h6>
          {props.visit.provider}
        </div>
      </div>
      <div className="patientDetailsDemographics"></div>
    </div> */}
    </PDFViewer>
  )
}
export default PatientDetails //BasicDocument;
