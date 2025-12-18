import React from "react";

const ReportedLessons = () => {
  return (
    <div className="overflow-x-auto text-black">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Lesson title</th>
            <th>report count</th>
            <th>See Details</th>
            <th>Take action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>
              <button className="btn btn-outline btn-secondary">See Details</button>
            </td>
            <td>
              <button className="btn btn-outline btn-primary">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReportedLessons;
