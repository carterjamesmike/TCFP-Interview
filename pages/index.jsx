import { create } from "domain";
import Head from "next/head";
import { useState } from "react";

const Home = () => {
  /**
   * An array of Fire Departments. Do not modify!
   */
  const departments = [
    { Id: 1, Name: "Austin Fire Department" },
    { Id: 2, Name: "Round Rock Fire Department" },
    { Id: 3, Name: "Georgetown Fire Department" },
    { Id: 4, Name: "Pflugerville Fire Department" },
  ];

  // Here is where you will store the reports.
  const [reports, setReports] = useState([
    {
      Id: 1,
      DepartmentId: 1,
      Department: departments[0],
      CreatedAt: new Date(2022, 1, 15, 20, 12, 15),
      Status: "Closed",
      DateOfIncident: new Date(2022, 1, 13, 10, 0, 0),
      Name: "Injured left index finger during training",
      Description:
        "Injury to left index finger at knuckle. Occurred while participating in forcible entry training exercises at fire academy.",
      Location: "123 Main St Austin, Texas",
      Type: "Training",
    },
    {
      Id: 2,
      DepartmentId: 2,
      Department: departments[1],
      CreatedAt: new Date(2022, 4, 14, 17, 44, 36),
      Status: "Pending",
      DateOfIncident: new Date(2022, 4, 14, 15, 30, 0),
      Name: "Vehicle Accident",
      Description: "Crashed car during training",
      Location: "Round Rock, Texas",
      Type: "Accident",
    },
    {
      Id: 3,
      DepartmentId: 1,
      Department: departments[2],
      CreatedAt: new Date(2023, 2, 14, 17, 44, 36),
      Status: "Open",
      DateOfIncident: new Date(2023, 2, 14, 15, 30, 0),
      Name: "Slipped and fell off a roof",
      Description: "Slipped and fell off a roof",
      Location: "Interstate 35, Georgetown, Texas",
      Type: "Other",
    },
  ]);

  // Here is a state for you to keep track the report the user has selected.
  const [selected, setSelected] = useState();

  // This state conrols the modal.
  const [showModal, setShowModal] = useState(false);

  // Could be `view`, `create`, `edit` or `delete`
  const [mode, setMode] = useState("create");

  /**
   * Toggles the modal.
   */
  const toggleModal = () => setShowModal(!showModal);

  // TODO: Prepare the application to receive a new Injury Report.
  const onNewReportClick = () => {
    // Set the mode to create, clear the selected report and toggle the modal.
    setSelected();
    setMode("create");
    toggleModal(true)
    
  };

  // TODO: When you click on the report, set the report you clicked on as the selected one and change the
  // mode to view.
  const onReportClick = (r) => {
    // Set the selected report, change mode to view and toggle modal.
    setSelected(r);
    setMode("view");
    toggleModal(true);
  };

  // TODO: Save new and updated reports.
  const onSaveReport = (e) => {
    // TODO: prevent default
   e.preventDefault();

    // The form element is currently uncontrolled but you can change it if you want.
    // ...

    if (mode == "create") {
      // TODO: A new report will need an Id and a Date on the CreatedAt property.
      const newReport = {
        Id: reports.length + 1,
        CreatedAt: new Date(),
        ...selected,
      }
      setReports([...reports, newReport]);

    } else {
      // Here you will need to find and update the report within the array of reports.
      setMode("edit");
      setReports(reports.map((report) => {
        if (report.Id === selected.Id) {
          return selected;
        } else {
          return report;
        }
      }));
    }
    // TODO: Don't forget to close the modal and reset the form.
    toggleModal(false);
    setSelected();

  };

  // TODO: Ask the user if they are sure they want to remove reports beforehand.
  const onDeleteReport = (r) => {
   if (window.confirm("Are you sure you want to delete this report?")) {  
    setMode("delete");
    setSelected(r);
    setReports(reports.filter((report) => report.Id !== r.Id));
    }
    // If users confirm, remove the report from the array of reports.

  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Injury Reports | Texas Commission on Fire Protection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col px-20 text-center gap-4">
        <h1 className="text-4xl font-bold">Injury Reports</h1>
        <div className="flex justify-center">
          <button
            className="p-2 bg-black font-semibold text-white rounded"
            onClick={onNewReportClick}
          >
            New Report
          </button>
        </div>
        <table className="table-auto">
          <thead>
            <tr className="border-b">
              <th>#</th>
              <th>Department</th>
              <th>Status</th>
              <th>Type</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* TODO: Loop through the reports and display them along with view, edit and delete buttons. */}
            {reports.map((r) => (
              <tr key={r.Id} className="border-b">
                <td>{r.Id}</td>
                <td>{r.Department.Name}</td>
                <td>{r.Status}</td>
                <td>{r.Type}</td>
                <td>{r.CreatedAt.toLocaleString()}</td>
                <td className="p-4">
                  <button
                    className="p-2 m-2 bg-black font-semibold text-white rounded"
                    onClick={() => onReportClick(r)}>
                    View
                  </button>
                  <button
                    className="p-2 m-2 bg-black font-semibold text-white rounded"
                    onClick={() => onReportClick(r)}>
                    Edit
                  </button>
                  <button
                    className="p-2 m-2 bg-black font-semibold text-white rounded"
                    onClick={() => onDeleteReport(r)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <div className="bg-black/25 absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="bg-white rounded-lg w-1/3 grid gap-3">
              <div className="font-bold bg-black text-white p-3 rounded-t-lg">
                {mode === "create" && `New Incident Report`}
                {mode !== "create" && `Report #${selected.Id}`}
              </div>
              <div className="flex justify-start p-3">
                <form
                  className="flex flex-col gap-2 w-full"
                  onSubmit={onSaveReport}
                >
                  <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="Status" className="font-semibold">
                      Status
                    </label>
                    <select
                      required
                      className="border p-2 rounded w-full border-gray-300"
                      name="Status"
                      defaultValue={selected?.Status ?? ""}
                      onChange={(e) => {
                        setSelected({
                          ...selected,
                          Status: e.target.value,
                        });
                      }}
                    >
                      <option disabled value="">
                        Select one
                      </option>
                      <option>Open</option>
                      <option>Pending</option>
                      <option>Closed</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="DepartmentId" className="font-semibold">
                      Department
                    </label>
                    <select
                      required
                      className="border p-2 rounded w-full border-gray-300"
                      name="DepartmentId"
                      defaultValue={selected?.DepartmentId ?? ""}
                      onChange={(e) => {
                        console.log(e.target.value)
                        setSelected({
                          ...selected,
                          DepartmentId: parseInt(e.target.value),
                          Department: departments.find((d) => d.Id === parseInt(e.target.value))
                        });
                      }}
                    >
                      <option disabled value="">
                        Select one
                      </option>
                      {departments.map((department) => (
                        <option value={department.Id} key={department.Id}>
                          {department.Name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="Type" className="font-semibold">
                      Type
                    </label>
                    <select
                      required
                      className="border border-gray-300 p-2 rounded w-full"
                      name="Type"
                      defaultValue={selected?.Type ?? ""}
                      onChange={(e) => {
                        setSelected({
                          ...selected,
                          Type: e.target.value,
                        });
                      }}
                    >
                      <option disabled value="">
                        Select one
                      </option>
                      <option>Training</option>
                      <option>Accident</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="Name" className="font-semibold">
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      name="Name"
                      className="border-gray-300 rounded"
                      placeholder="The name of the incident."
                      defaultValue={selected?.Name ?? ""}
                      onChange={(e) => {
                        setSelected({
                          ...selected,
                          Name: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="Description" className="font-semibold">
                      Description
                    </label>
                    <textarea
                      required
                      placeholder="Short description of the incident."
                      className="border-gray-300 rounded"
                      name="Description"
                      defaultValue={selected?.Description ?? ""}
                      onChange={(e) => {
                        setSelected({
                          ...selected,
                          Description: e.target.value,
                        });
                      }}
                    ></textarea>
                  </div>
                  <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="Location" className="font-semibold">
                      Location
                    </label>
                    <input
                      required
                      type="text"
                      name="Location"
                      className="border-gray-300 rounded"
                      placeholder="Address where the incident happened."
                      defaultValue={selected?.Location ?? ""}
                      onChange={(e) => {
                        setSelected({
                          ...selected,
                          Location: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="DateOfIncident" className="font-semibold">
                      Date of Incident
                    </label>
                    <input
                      required
                      type="datetime-local"
                      name="DateOfIncident"
                      className="border-gray-300 rounded"
                      placeholder="When the incident happened."
                      defaultValue={
                        //selected?.DateOfIncident.toJSON().split(".")[0] ?? ""
                         selected?.DateOfIncident ?? ""
                      }
                      onChange={(e) => {
                        setSelected({
                          ...selected,
                          DateOfIncident: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="flex justify-end gap-2 p-3">
                    <button
                      type="submit"
                      className="p-2 bg-blue-500 text-white rounded font-semibold"
                    >
                      Save
                    </button>
                    <button
                      className="p-2 bg-red-500 text-white rounded font-semibold"
                      onClick={toggleModal}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          &copy; {new Date().getFullYear()} Texas Commission on Fire Protection
        </a>
      </footer>
    </div>
  );
};

const Label = ({ children, type }) => {
  const classes = ["text-xs p-1 border rounded font-bold"];

  if (type === "success")
    classes.push("bg-green-300 text-green-600 border-green-300");
  else if (type === "warning")
    classes.push("bg-yellow-300 text-yellow-600 border-yellow-300");
  else if (type === "error")
    classes.push("bg-red-300 text-red-600 border-red-300");
  else classes.push("bg-white text-black border-black");

  return <span className={classes.join(" ")}>{children}</span>;
};

export default Home;
