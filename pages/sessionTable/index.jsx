'use client';

import { useEffect, useState } from 'react';
import Layout from '../../app/Layout/index';
import { Divider, Table } from 'antd';
import Link from 'next/link';
import moment from 'moment/moment';

export default function SessionTable() {

  const [table, setTable] = useState([])

  useEffect(()=>{
    const options={
      method:'GET',
      headers:{}
    }

    fetch('http://ec2-18-181-189-44.ap-northeast-1.compute.amazonaws.com:8080/api/v1/session/getAll', options)
    .then(response=>response.json())
    .then(data=>{
      console.log('tableData', data);
      setTable(data.body)
    })
  },[])

  const columns = [
    {
      title: 'Sho\'ba nomi ',
      dataIndex: 'name',
      fixed:'left',
      width: 100
    },
    {
      title: 'Konferensiya',
      dataIndex: 'conference',
    },
    {
      title: 'Sho\'ba yaratilgan sana',
      dataIndex: 'date',
    },
  ];

  table.map((item)=>{
    console.log('item', item);
  })

  const data =table.map(data=>(
    {
      key: `${data.id}`,
      name:`${data.name}`,
      conference: <Link style={{color:'blue'}} href='/article'>{data.conference}</Link>,
      date: `${moment(data.createdAt).format("DD.MM.YYYY hh:mm:ss")}`
    }
  ))


	return (
		<Layout>
			<Divider>Sho&apos;balar</Divider>
			<Table columns={columns} dataSource={data} size='middle' scroll={{x: 425, y:300}} />
		</Layout>
	);
}
