'use client'
import { Column } from 'primereact/column';
import {  DataTable  } from 'primereact/datatable'
import { useState } from 'react';
import dayjs from 'dayjs'
import { Tag } from 'primereact/tag';

interface Payment {
    dateCreate: Date,
    endToEndId: string,
    reason: string
    identifierPayment: string,
    status: string
    value: string
}

interface TableProps {
    payments: Payment[]
}
 
export default function PaymentTable({ payments }: TableProps) {

	const [products] = useState<Payment[]>(payments)

	const statusBodyTemplate = (product: Payment) => {
        return <Tag value={product.status} severity={getSeverity(product)}></Tag>;
    };

	const getSeverity = (product: Payment) => {
        switch (product.status) {
            case 'aceito':
                return 'success';

            case 'PENDENTE':
                return 'warning';

            case 'rejeitado':
                return 'danger';

            default:
                return null;
        }
    };


	return (
		<DataTable value={products} showGridlines tableStyle={{ minWidth: '50rem' }}>
			<Column field="id" header="id"></Column>
			<Column field="date" header="Data" body={({ dateCreate }: Payment) => dayjs(dateCreate).format('DD/MM/YYYY')}></Column>
			<Column field="value" header="Valor" body={({value}) => Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(value)}></Column>
			<Column field="reason" header="Motivo" body={({reason}) => reason}></Column>
			<Column field="status" header="Status" body={statusBodyTemplate}></Column>
		</DataTable>
	)
}