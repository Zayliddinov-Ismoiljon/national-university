import { useState } from "react";
import { message } from "antd";

const useFetch = async ({ data = {url: '', method: "",} }) => {
  const [res, setRes] = useState();
	const { url, method, body, dataType } = data;
	const token = localStorage.getItem('token');

	let options = {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
      Authorization: `Bearer ${token}`,
		},
	};

  const formdata = dataType === "formdata" ? body : JSON.stringify(body);

	if (method !== 'get' || method !== 'delete') {
		options = { ...options, body: formdata };
	}

	await fetch(
		`http://ec2-18-181-189-44.ap-northeast-1.compute.amazonaws.com:8080/api/v1/auth/${
			 url.startsWith('/') ? url : url.slice(1)
		}`,
		options,
	)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			if (data?.status == 200) {
        if(method === "post"){
          setRes(data);
        } else{
          setRes(data?.body);
        }
			} else {
				message.error(data?.friendlyMessage);
			}
		});

    return res;
};

export default useFetch;