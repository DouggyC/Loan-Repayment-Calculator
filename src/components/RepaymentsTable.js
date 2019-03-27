import React, { memo } from 'react';
import styled from 'styled-components';
import { Table } from 'reactstrap';

const RepaymentsTable = memo(({ value }) => {
  // console.log(value);
  return (
    <Table
      style={{
        margin: '0 0.1px',
        backgroundColor: '#fff',
        boxSizing: 'border-box',
        width: '100%'
      }}
    >
      <thead>
        <tr>
          <TableCellHeading>Month</TableCellHeading>
          <TableCellHeading>Starting Principal</TableCellHeading>
          <TableCellHeading>Monthly Repayment</TableCellHeading>
          <TableCellHeading>Principal paid</TableCellHeading>
          <TableCellHeading>Interest paid</TableCellHeading>
          <TableCellHeading>Remaining Principal</TableCellHeading>
        </tr>
      </thead>
      <tbody>
        {value.repaymentSchedule.map((item, i) => (
          <tr key={i}>
            <TableCell>{item.month}</TableCell>
            <TableCell>${item.startPrin}</TableCell>
            <TableCell>${item.mnthRepay}</TableCell>
            <TableCell>${parseFloat(item.mnthPrin).toFixed(2)}</TableCell>
            <TableCell>${parseFloat(item.mnthInt).toFixed(2)}</TableCell>
            <TableCell>${item.remainingPrin}</TableCell>
          </tr>
        ))}
      </tbody>
    </Table>
  );
});

export default RepaymentsTable;

const TableCellHeading = styled.td`
  font-size: calc(20% * 7vw + 0.5rem);
  vertical-align: middle !important;
  text-align: center !important;
  font-weight: normal !important;
  padding: 1px 2px !important;
  border-color: #17a2b8 !important;
  box-sizing: border-box !important;
`;

const TableCell = styled.td`
  font-size: calc(20% * 7vw + 0.5rem);
  vertical-align: middle !important;
  text-align: center !important;
  font-weight: 300 !important;
  padding: 1px 2px !important;
  border-color: #17a2b8 !important;
  box-sizing: border-box !important;
`;
