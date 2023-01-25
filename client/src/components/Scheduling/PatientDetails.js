import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
} from '@react-pdf/renderer'

// Register font

Font.register({ family: 'Helvetica' })
Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
})
// Create styles

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  section: {
    flexDirection: 'column',
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  section1: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  viewer: {
    width: '100%', //window.innerWidth, //the pdf viewer will take up all of the width and height
    height: '880px',
  },
  body: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 16,
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
    textAlign: 'left',
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
const PatientDetails = (props) => {
  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.header} fixed>
              POEHR&#174;
            </Text>
            <Text style={styles.title}>Patient Visit Details</Text>

            <View style={styles.section1}>
              <Text style={styles.subtitle}>Patient Name:</Text>
              <Text style={styles.text}>
                {props.visit.firstName} {props.visit.middleName}{' '}
                {props.visit.lastName}
              </Text>
              <Text style={styles.subtitle}>Email:</Text>
              <Text style={styles.text}>{props.visit.email}</Text>
              <Text style={styles.subtitle}>Visit Date:</Text>
              <Text style={styles.text}>
                {props.visit.visitDate} {props.visit.hourOfVisit}
              </Text>
              <Text style={styles.subtitle}>Physician:</Text>
              <Text style={styles.text}>{props.visit.provider}</Text>
            </View>
            {/* <View style={styles.section}>
              <Text style={styles.subtitle}>Patient Name:</Text>
              <Text style={styles.text}>
                {props.visit.firstName} {props.visit.middleName}{' '}
                {props.visit.lastName}
              </Text>
              <Text style={styles.subtitle}>Email:</Text>
              <Text style={styles.text}>{props.visit.email}</Text>
              <Text style={styles.subtitle}>Visit Date:</Text>
              <Text style={styles.text}>
                {props.visit.visitDate} {props.visit.hourOfVisit}
              </Text>
              <Text style={styles.subtitle}>Physician:</Text>
              <Text style={styles.text}>{props.visit.provider}</Text>
            </View> */}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}
export default PatientDetails //BasicDocument;
