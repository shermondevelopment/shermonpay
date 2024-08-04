'use client'
import { Column } from 'primereact/column';
import {  DataTable  } from 'primereact/datatable'
import { useState } from 'react';
import dayjs from 'dayjs'
import { Tag } from 'primereact/tag';

interface Payment {
    id: string;
    date: string;
    type: string;
    status: string
}

const transactionArray = [
	{
        id: "89hf823odjasjdiasdj",
        date: "2023-05-10T14:48:00.000Z",
        type: "PIX",
        status: "APROVADO"
    },
    {
        id: "oyd7dhoasaidai2ol",
        date: "2023-07-22T10:20:00.000Z",
        type: "PIX",
        status: "PENDENTE"
    },
    {
        id: "2198ydahdasihdaisohd",
        date: "2023-08-01T16:35:00.000Z",
        type: "PIX",
        status: "CANCELADO"
    },
    {
        id: "aod82ye8hdiasjdia",
        date: "2023-06-15T09:45:00.000Z",
        type: "PIX",
        status: "APROVADO"
    },
    {
        id: "17d7ashdoasii",
        date: "2023-07-30T13:10:00.000Z",
        type: "PIX",
        status: "CANCELADO"
    }
]
 
export default function PaymentTable() {

	const [products] = useState<Payment[]>(transactionArray)

	const statusBodyTemplate = (product: Payment) => {
        return <Tag value={product.status} severity={getSeverity(product)}></Tag>;
    };

	const getSeverity = (product: Payment) => {
        switch (product.status) {
            case 'APROVADO':
                return 'success';

            case 'PENDENTE':
                return 'warning';

            case 'CANCELADO':
                return 'danger';

            default:
                return null;
        }
    };


	return (
		<DataTable value={products} showGridlines tableStyle={{ minWidth: '50rem' }}>
			<Column field="id" header="id"></Column>
			<Column field="date" header="date" body={({ date }: Payment) => dayjs(date).format('DD/MM/YYYY')}></Column>
			<Column field="type" header="Tipo de Pagamento"></Column>
			<Column field="status" header="Status" body={statusBodyTemplate}></Column>
		</DataTable>
	)
}