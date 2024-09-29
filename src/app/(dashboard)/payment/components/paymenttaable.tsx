'use client'
import { Column } from 'primereact/column';
import {  DataTable  } from 'primereact/datatable'
import dayjs from 'dayjs'
import { Tag } from 'primereact/tag';
import  usePayments from '@/app/utils/usePayments'
import { Payments } from '@prisma/client';


export default function PaymentTable() {


	const statusBodyTemplate = (product: Payments) => {
        return <Tag value={product.status.toUpperCase()} severity={getSeverity(product)}></Tag>;
    };

    const { data, isLoading } = usePayments()

	const getSeverity = (product: Payments) => {
        switch (product.status) {
            case 'APPROVE':
                return 'success';

            case 'PENDING':
                return 'warning';

            case 'EXPIRED':
                return 'danger';

            default:
                return null;
        }
    };


	return (
		<div>
            <DataTable value={data} showGridlines tableStyle={{ minWidth: '50rem' }} loading={isLoading}>
			<Column field="id" header="id"></Column>
			<Column field="created_at" header="Data" body={({ created_at }: Payments) => dayjs(created_at).format("DD/MM/YYYY [às] HH:mm:ss")}></Column>
			<Column field="value" header="Valor" body={({  ammount }: Payments) => Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(ammount)}></Column>
			<Column field="reason" header="Motivo" body={({ reason }: Payments) => reason !== '' ? reason : '-'}></Column>
			<Column field="reason" header="Redirect URI" body={({ redirectURI }: Payments) => redirectURI.substring(0, 20)}></Column>
			<Column field="status" header="Status" body={statusBodyTemplate}></Column>
		   </DataTable>
           <div className="w-full flex justify-content-center mt-5">
           <span>{data?.length}</span>
           </div>
        </div>
	)
}