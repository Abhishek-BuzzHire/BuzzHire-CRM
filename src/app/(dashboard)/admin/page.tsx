import CVCount from "@/components/CVCount"
import EventCard from "@/components/EventCard"
import Pipeline from "@/components/Pipeline"
import WeeklyStats from "@/components/WeeklyStats"

const AdminPage = () => {
  return (
    <>
      <div className='p-4 flex gap-4 flex-col md:flex-row bg-blueLight-50'>
        <div className="w-full lg:w-2/3 flex flex-col">
          < Pipeline />
          < WeeklyStats />
        </div>
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <CVCount />
          < EventCard />
        </div>
      </div>
    </>
  )
}

export default AdminPage