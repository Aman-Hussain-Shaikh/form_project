import { useState } from 'react';
import PropTypes from 'prop-types';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const options = ['B.tech', 'M.tech'];

const MyDocument = ({ name, course }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.text}>Name: {name}</Text>
        <Text style={styles.text}>Course: {course}</Text>
        <Text style={styles.text}>Date of Offer: {new Date().toLocaleDateString()}</Text>
      </View>
    </Page>
  </Document>
);

MyDocument.propTypes = {
  name: PropTypes.string.isRequired,
  course: PropTypes.string.isRequired,
};

const Form = () => {
  const [name, setName] = useState('');
  const [course, setCourse] = useState(options[0]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleFormSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ ...styles.input, width: '100%' }}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Course:</label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            style={{ ...styles.input, width: '100%' }}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button type="submit" style={{ ...styles.button, backgroundColor: '#007bff' }}>Submit</button>
          <PDFDownloadLink document={<MyDocument name={name} course={course} />} fileName="offer.pdf">
            {({ loading }) =>
              loading ? 'Loading document...' : <button style={{ ...styles.button, backgroundColor: '#28a745' }}>Generate PDF</button>
            }
          </PDFDownloadLink>
        </div>
      </form>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: 800,
    margin: '0 auto',
    padding: 20,
    backgroundColor: '#f7f7f7',
    borderRadius: 5,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left', 
  },
  input: {
    padding: 10,
    borderRadius: 5,
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 20px',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    marginLeft: 10, 
  },
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    marginBottom: 5,
  },
});

export default Form;
