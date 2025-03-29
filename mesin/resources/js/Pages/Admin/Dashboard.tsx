import AdminLayout from "@/Layouts/AdminLayout";
import {Head} from "@inertiajs/react";
import {Icon} from "@iconify-icon/react";
import {Bar} from 'react-chartjs-2';

export default function () {
    return (
        <AdminLayout>
            <Head title="Dashboard"/>

            <p>Dashboard On Progress</p>
        </AdminLayout>
    )
}
