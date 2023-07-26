import React, { useState } from 'react';
import { List, Box, Divider } from '@mui/material';

function OrdersList() {
  const [orders, setOrders] = useState([
    {
      _id: {
        $oid: '648dfd1ee01e091d8de69395',
      },
      enabled: true,
      name: 'iPhone 11',
      sale: false,
      currentPrice: 462,
      previousPrice: 512,
      categories: 'cellphone',
      imageUrls: [
        'phones/xl7h98p6m84ilxrvqg5y.jpg',
        'phones/oxlgcb4vg7ygn15mo3ob.jpg',
        'phones/rvtsebqxxh4wuukknzgb.jpg',
        'phones/egfscwofa6ocvvcmyzda.jpg',
      ],
      quantity: 8,
      color: 'Black',
      brand: 'Apple',
      storage: '64gb',
      itemNo: '77552',
      description:
        'The iPhone 11 cannot be replaced by a new smartphone, it is a direct fit for the iPhone XR. The smartphone has halved, the dimensions with the front edge are smoothed. The main innovations are innovations in color solutions, even the same and earlier than the best iPhone. I clicked one snake and another modulation of the camera was detected, now the ultra-wide-angle lens has reached the wide-angle one. This allows you to create group portraits and beautiful panoramas. Like the process that will now win, the faster and more energy efficient Apple 13 Bionic. What is worth an hour of autonomous robots, here the company has built a crock forward and the smartphone is obliged to work for at least a year in the new XR model.',
      guarantee: '3 months',
      date: {
        $date: '2019-10-14T12:46:29.042Z',
      },
    },
    {
      _id: {
        $oid: '648dfd1ee01e091d8de69396',
      },
      enabled: true,
      name: 'iPhone 13',
      sale: true,
      currentPrice: 717,
      previousPrice: 767,
      categories: 'cellphone',
      imageUrls: [
        'phones/fwd6fpjujgtt8cclohli.jpg',
        'phones/leedxcxbnpdownfeaurt.png',
        'phones/zrcebawfimlzhww2y0vf.jpg',
      ],
      quantity: 10,
      color: 'Blue',
      brand: 'Apple',
      storage: '128gb',
      itemNo: '80465',
      description:
        'The smartphone of the new generation combines technological trends from the previous models with new solutions. The iPhone 13 processor has become thinner, and the cameras are better. Before that, the retailers added a full 5G chip for complete signal transmission, updated the color palette and software security. New over-wide-angle camera for more detail in dark areas of the image. You get 47% more light for more photos and videos. New optical stabilization for damaged matrices to ensure clear shots in an unstable position.',
      guarantee: '3 months',
      date: {
        $date: '2019-10-14T12:46:30.042Z',
      },
    },
  ]);

  return (
    <List>
      {orders.map((product) => (
        <div key={product.itemNo}>
          <Box>date</Box>
          <Box>products</Box>
          <Box>totalSum</Box>
          <Box>deliveryAddress</Box>
          <Divider />
        </div>
      ))}
    </List>
  );
}

export default OrdersList;
