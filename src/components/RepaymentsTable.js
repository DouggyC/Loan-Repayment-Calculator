import React, { memo } from 'react';
import styled from 'styled-components';
import { Table } from 'reactstrap';

const RepaymentsTable = memo(({ value }) => {
  // console.log(value);
  return (
    <Table style={{ backgroundColor: '#fff' }}>
      <thead>
        <tr>
          <TableCell>Month</TableCell>
          <TableCell>Starting Principal</TableCell>
          <TableCell>Monthly Repayment</TableCell>
          <TableCell>Principal paid</TableCell>
          <TableCell>Interest paid</TableCell>
          <TableCell>Remaining Principal</TableCell>
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

const TableCell = styled.td`
  font-size: calc(20% * 8vw + 0.7rem);
  vertical-align: middle !important;
  text-align: center !important;
  font-weight: normal !important;
  padding: 1px 2.5px !important;
  border-color: #17a2b8 !important;
`;
