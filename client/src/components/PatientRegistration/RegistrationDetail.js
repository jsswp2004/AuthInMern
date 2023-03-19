import React from 'react'
// import blue from
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
} from '@react-pdf/renderer'
// import { borderRadius, height } from '@mui/system'
import { blue, lightBlue } from '@mui/material/colors'
// import { light } from '@mui/material/styles/createPalette'

// Register font

Font.register({ family: 'Helvetica' })
Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
})
// Create styles

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 15,
    '@media max-width: 400': {
      paddingTop: 10,
      paddingLeft: 0,
    },
  },

  demographics: {
    // flexDirection: 'row',
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  section: {
    // flexDirection: 'row',
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  section0: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  subsection0: {
    flexDirection: 'column',
    marginLeft: 0,
    paddingLeft: 4,
    flexGrow: 1,
  },
  subsection1: {
    flexDirection: 'column',
    marginLeft: 0,
    paddingLeft: 4,
    flexGrow: 1,
    border: 1,
    borderColor: blue,
    backgroundColor: lightBlue,
    borderRadius: 8,
    height: 100,
  },
  section1: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  viewer: {
    width: '100%', //window.innerWidth, //the pdf viewer will take up all of the width and height
    height: '91dvh',
  },
  body: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 14,
    // textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'Oswald',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 12,
    margin: 1,
    fontFamily: 'Oswald',
  },
  text: {
    margin: 1,
    fontSize: 12,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 10,
    marginTop: 5,
    marginLeft: 10,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    textAlign: 'center',
  },
  leftColumn: {
    flexDirection: 'column',
    flexGrow: 1,
    // alignItems: 'flex-end',
    // justifySelf: 'flex-end',
  },
  rightColumn: {
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'flex-start',
    marginRight: 10,
    // justifySelf: 'flex-end',
  },
  date: {
    fontSize: 14,
    fontFamily: 'Oswald',
  },
  entryContainer: {
    marginBottom: 10,
    flexDirection: 'row',
  },
})

// Create Document Component
//   function BasicDocument(props) {
const RegistrationDetail = (props) => {
  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}
        <Page size="Letter" style={styles.page}>
          <Text style={styles.header} fixed>
            POEHR&#174;
          </Text>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Patient Registration Details</Text>
            </View>

            <View style={styles.entryContainer}>
              <View style={styles.leftColumn}>
                {/* <Text style={styles.title}></Text> */}
                <Text style={styles.text}>
                  Patient Name: {props.visit.firstName} {props.visit.middleName}{' '}
                  {props.visit.lastName}
                </Text>
                <Text style={styles.text}>DOB: {props.visit.dateOfBirth}   Age: {props.visit.age}</Text>
                <Text style={styles.text}>Gender: {props.visit.gender}</Text>
                <Text style={styles.text}>Race: {props.visit.race}</Text>
                <Text style={styles.text}>Language: {props.visit.language}</Text>
                <Text style={styles.text}>Address: {props.visit.address}</Text>
                <Text style={styles.text}>City: {props.visit.city}</Text>
                <Text style={styles.text}>Zip Code:{props.visit.zipCode}</Text>
                <Text style={styles.text}>State: {props.visit.state}</Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={styles.text}>
                  MRN: {props.visit.medicalRecordNumber}
                </Text>
                <Text style={styles.text}>
                  Visit ID: {props.visit.visitNumber}
                </Text>
                <Text style={styles.text}>Date Registered: {props.visit.addedDate}</Text>
                <Text style={styles.text}>Email: {props.visit.email}</Text>
                <Text style={styles.text}>Home phone: {props.visit.homePhone}</Text>
                <Text style={styles.text}>Cell phone: {props.visit.cellphone}</Text>
                <Text style={styles.text}>Work phone: {props.visit.businessPhone}</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}
export default RegistrationDetail //BasicDocument;
