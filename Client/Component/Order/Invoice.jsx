import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { 
    Table,
    TableHeader,
    TableCell,
    TableBody,
    DataTableCell
} from '@david.kucsai/react-pdf-table';

import fontThai from './leelawad.ttf';
import moment from 'moment/min/moment-with-locales';

Font.register({ family: 'Leelawad', src: fontThai });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    fontFamily: 'Leelawad',
    textAlign: 'center',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  summary:{
    textAlign:'right'
  }
});

const Invoice = ({ order }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>เพชร การค้า</Text>
          <Text  style={styles.summary}>วันที่สั่งซื้อ : {moment(order.orderTotal).format('ll')}</Text>
          <Table data={order.products}>
            <TableHeader>
              <TableCell>รายการสินค้า</TableCell>
              <TableCell>ราคาสินค้า</TableCell>
              <TableCell>จำนวนสินค้า</TableCell>
            </TableHeader>
            <TableBody>
              <DataTableCell getContent={item => item.name} />
              <DataTableCell getContent={item => item.price} />
              <DataTableCell getContent={item => item.count} />
            </TableBody>
          </Table>
          <Text style={styles.summary}>ราคารวมสุทธิ : {order.orderTotal}</Text>
        </View>
      </Page>
    </Document>
  )
}

export default Invoice;
