import { getAllWorkers } from "@/app/lib/actions/wokers";
import WorkersGrid from "./WorkersGrid";



export default async function WorkersPage() {



    const allWorkers =  await getAllWorkers()
    return <div>Workers Page


        <WorkersGrid workers={allWorkers} />
    </div>;
}