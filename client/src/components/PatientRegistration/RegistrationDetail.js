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
import { borderRadius, height } from '@mui/system'
import { blue, lightBlue } from '@mui/material/colors'
import { light } from '@mui/material/styles/createPalette'

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
    height: '800px',
  },
  body: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
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
    marginBottom: 12,
    textAlign: 'right',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
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
          <View style={styles.section}>
            <Text style={styles.header} fixed>
              POEHR&#174;
            </Text>
            <Text style={styles.title}>Patient Registration Details</Text>

            <View style={styles.section0}>
              <View style={styles.subsection0}>
                <Text style={styles.subtitle}>
                  Patient Name:{' '}
                  <Text style={styles.text}>
                    {props.visit.firstName} {props.visit.middleName}{' '}
                    {props.visit.lastName}
                  </Text>
                </Text>
                <Text style={styles.subtitle}>
                  Gender: <Text style={styles.text}>{props.visit.gender}</Text>
                </Text>
                <Text style={styles.subtitle}>
                  Race: <Text style={styles.text}>{props.visit.race}</Text>
                </Text>

                <Text style={styles.subtitle}>
                  Language:{' '}
                  <Text style={styles.text}>{props.visit.language}</Text>
                </Text>
                <Text style={styles.subtitle}>
                  Address:{' '}
                  <Text style={styles.text}>{props.visit.address}</Text>
                </Text>

                <Text style={styles.subtitle}>
                  City: <Text style={styles.text}>{props.visit.city}</Text>
                </Text>

                <Text style={styles.subtitle}>
                  Zipcode:{' '}
                  <Text style={styles.text}>{props.visit.zipCode}</Text>
                </Text>

                <Text style={styles.subtitle}>
                  State: <Text style={styles.text}>{props.visit.state}</Text>
                </Text>

                <Text style={styles.subtitle}>
                  Email: <Text style={styles.text}>{props.visit.email}</Text>
                </Text>
              </View>
{/* 
              <View style={styles.subsection1}>
                <Text style={styles.subtitle}>
                  MRN:{' '}
                  <Text style={styles.text}>
                    {props.visit.medicalRecordNumber}
                  </Text>
                </Text>
                <Text style={styles.subtitle}>
                  Visit ID:{' '}
                  <Text style={styles.text}>{props.visit.visitNumber}</Text>
                </Text>
                <Text style={styles.subtitle}>
                  DOB:{' '}
                  <Text style={styles.text}>{props.visit.dateOfBirth}</Text>
                </Text>
                <Text style={styles.subtitle}>
                  Age: <Text style={styles.text}>{props.visit.age}</Text>
                </Text>
                <Text style={styles.subtitle}>
                  Date of Registration:{' '}
                  <Text style={styles.text}>{props.visit.addedDate}</Text>
                </Text>
              </View> */}
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}
export default RegistrationDetail //BasicDocument;
