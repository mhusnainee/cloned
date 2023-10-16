import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { get_shared_doc_events } from "../API/documentCalls";
import { xmark, loadingSvg } from "../assets/icons";
import { fetchAuthToken } from "../auth/authToke";
import SvgLoading from "../component/spinners/SvgLoading";

const MyEvents = () => {
  const [selected, seTselected] = useState();
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setDataLoading(true);
    await get_shared_doc_events().then((res) => {
      if (res.data) {
        let events = [];
        res.data.map((item) => {
          return item.documents.map((obj) => {
            return events.push({
              title: obj.documentName,
              start: obj.dueDate,
              ...obj,
            });
          });
        });

        setEvents(events);
      }
    });
    setDataLoading(false);
  };

  const handleSelect = (args) => {
    console.log(args);
  };

  if (open) {
    return (
      <div className="w-full md:w-[750px] p-4 text-black dark:text-sfy ">
        <div className=" bg-white w-full rounded-md">
          <div className="border-b text-black dark:text-sfy dark:border-b-black duration-500 pb-2 flex items-center justify-between">
            <div>
              <h1>Selected Document</h1>
            </div>
            <div
              className="hover:cursor-pointer"
              onClick={() => {
                seTselected(null);
                setOpen(false);
              }}
            >
              {xmark}
            </div>
          </div>
          <div className="mt-2">
            <div>
              <h1>
                <span className="font-bold">Assignee : </span>
                {selected.assignee}
              </h1>
            </div>
            <div>
              <h1>
                <span className="font-bold">Assigner : </span>
                {selected.assigner}
              </h1>
            </div>
          </div>
          <div className="mt-2">
            <h1>
              <span className="font-bold">Event Title : </span>
              {selected.documentName}
            </h1>
            <div>
              <h1>
                <span className="font-bold">Event Note : </span>
                {selected.note}
              </h1>
            </div>
            <div>
              <h1>
                <span className="font-bold">Due Date : </span>
                {selected.dueDate}
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {dataLoading ? (
        <SvgLoading />
      ) : (
        <div className="w-full">
          <div className="w-full md:max-w-[400] lg:max-w-[1000px] dark:bg-sfy dark:text-white duration-500 p-4 rounded-md">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              weekends={true}
              selectable={true}
              eventClick={(inf) => {
                seTselected(inf.event._def.extendedProps);
                setOpen(true);
              }}
              events={events}
              select={handleSelect}
              eventContent={renderEventContent}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MyEvents;

function renderEventContent(eventInfo) {
  const user = fetchAuthToken();
  const backgroundColor =
    eventInfo.event.extendedProps.assignee === user.email
      ? "#059669"
      : "#38bdf8";
  return (
    <div className="rounded-sm" style={{ backgroundColor }}>
      <div className="px-2   overflow-hidden overflow-ellipsis">
        <i>{eventInfo.event.title}</i>
      </div>
    </div>
  );
}
