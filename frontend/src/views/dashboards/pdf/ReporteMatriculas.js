import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
  
});

// Create Document Component
const ReporteMatriculas = ({ matriculas, filtroSettings, cantidadMatriculasFiltradas}) => {
console.log('sds', filtroSettings.anioMostrarInforme )
return (
  <Document>
    <Page size="A4">
    <View style={styles.section}>
    <Text style={{ fontSize: 15 }}>Informe de Matriculas</Text>
    <Text style={{ fontSize: 10 }}>Cantidad de matriculas: {cantidadMatriculasFiltradas}</Text>
    <Text style={{ fontSize: 10 }}>Filtrando por año: { filtroSettings.anioMostrarInforme === "no-filtrar-anio" ? 'No filtrado por año' : filtroSettings.anioMostrarInforme }</Text>
    <Text style={{ fontSize: 10, marginBottom: 10 }}>Filtrando por estado de matricula: { filtroSettings.estadoMostrarInforme === "no-filtrar-estado" ? 'No filtrado por estado de matricula' : filtroSettings.estadoMostrarInforme }</Text>


        <View style={{ flexDirection: 'row', borderBottom: 1, borderTop: 1, textAlign: 'center', justifyContent: 'center', backgroundColor: "#008f39", color: "#fff"  }}>
          <Text style={{ fontSize: 10, width: '44%', borderRight: 1 }}>Cédula Estudiante</Text>
          <Text style={{ fontSize: 10, width: '44%', borderRight: 1 }}>Nombre Completo</Text>
          <Text style={{ fontSize: 10, width: '44%', borderRight: 1 }}>Fecha de matricula</Text>
          <Text style={{ fontSize: 10, width: '44%' }}>Estado de la matricula</Text>
        </View>
        {matriculas.map(({ _id:id, nombreCompleto, cedulaEstudiante, fechaCreacionMatricula, estadoMatriculaAdmin }, index) => (
          <View key={ id } style={{ flexDirection: 'row', borderBottom: 1, textAlign: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 10, width: '44%', borderRight: 1 }}>{ cedulaEstudiante }</Text>
            <Text style={{ fontSize: 10, width: '44%', borderRight: 1 }}>{ nombreCompleto }</Text>
            <Text style={{ fontSize: 10, width: '44%', borderRight: 1 }}>{ fechaCreacionMatricula }</Text>
            <Text style={{ fontSize: 10, width: '44%' }}>{ estadoMatriculaAdmin }</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
)};

export default ReporteMatriculas;