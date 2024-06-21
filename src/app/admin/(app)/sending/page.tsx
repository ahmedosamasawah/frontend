"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Modal from "../../../../common/components/model";
import {
  useGetAllExpensesQuery,
  useDeleteExpensesMutation,
  useCreateExpensesMutation,
  useUpdateExpensesMutation,
} from "../../features/expensesApi";
import { useGetAllExpenseTypesQuery } from "../../features/expensetypesApi";
import Loading from "../../../loading";

const Sending = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const [openedIndex, setOpenedIndex] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpen2, setModalOpen2] = useState(false);
  const [editExpensesData, setEditExpensesData] = useState({
    id: "",
    date: "",
    exType: "",
    cost: 0,
  });

  const { data: expenseType, error: tError } = useGetAllExpenseTypesQuery(null);
  const { data, error, isLoading, refetch } = useGetAllExpensesQuery(null);
  const [deleteExpenses] = useDeleteExpensesMutation();
  const [createExpenses, { isLoading: isCreating }] =
    useCreateExpensesMutation();
  const [updateExpenses] = useUpdateExpensesMutation();

  useEffect(() => {
    if (data) {
      console.log("Response Data:", data);
    }
    if (error) {
      console.log("Error:", error);
    }
  }, [data, expenseType, tError, error]);

  const handleEditInputChange = e => {
    const { name, value } = e.target;
    setEditExpensesData({
      ...editExpensesData,
      [name]: value,
    });
  };

  const handleChange = event => {
    const value = event.target.value;
    setEditExpensesData(prevState => ({
      ...prevState,
      exType: value,
    }));
  };

  const handleDelete = async id => {
    try {
      await deleteExpenses(id).unwrap();
      console.log(`Expense with ID ${id} deleted successfully`);
      refetch();
    } catch (err) {
      console.error("Failed to delete the expense: ", err);
    }
  };

  const toggleNavbardots = index => {
    setOpenedIndex(openedIndex === index ? null : index);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenModal2 = expense => {
    setEditExpensesData({
      id: expense._id,
      date: expense.date,
      exType: expense.exType,
      cost: expense.cost,
    });
    setModalOpen2(true);
  };

  const handleCloseModal2 = () => {
    setModalOpen2(false);
  };

  const formatTransactionDate = dateString => {
    if (!dateString) return "No transaction date";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleString();
  };

  const handleCreate = async e => {
    e.preventDefault();
    const formattedDate = `${editExpensesData.date}T12:00:00`;
    const newExpenseData = { ...editExpensesData, date: formattedDate };
    try {
      await createExpenses(newExpenseData).unwrap();
      console.log("Expense created successfully");
      refetch();
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to create expense: ", err);
    }
  };

  const handleUpdate = async e => {
    e.preventDefault();
    const { id, date, exType, cost } = editExpensesData;
    const formattedDate = `${date}T12:11:00`;
    const updatedExpenseData = { date: formattedDate, exType, cost };
    console.log({ id, formData: updatedExpenseData });
    try {
      await updateExpenses({ id, formData: updatedExpenseData }).unwrap();
      console.log("Expense updated successfully");
      refetch();
      setModalOpen2(false);
    } catch (err) {
      console.error("Failed to update expense: ", err);
    }
  };

  if (isLoading)
    return (
      <div className="mt-[50px] px-4 py-12 md:px-8 lg:mr-[260px] lg:px-16">
        <Loading />
      </div>
    );

  return (
    <div className="mt-[50px] px-4 py-12 md:px-8 lg:mr-[260px] lg:px-16">
      <div className="grid gap-6">
        <div className="flex items-center justify-between p-5 max-[659px]:grid max-[659px]:justify-center max-[659px]:gap-7 max-[542px]:text-center">
          <div className="flex justify-center max-[542px]:text-center">
            <p className="text-[18px] text-white">المصاريف</p>
          </div>
          <div className="flex items-center gap-3 max-[659px]:grid">
            <button className="flex items-center gap-1 text-[16px] text-secondary-normal underline underline-offset-4">
              <Image
                width={30}
                height={30}
                src="/assets/icons/download.svg"
                alt="dowload"
              />
              تحميل البيانات كملف
            </button>
            <button
              onClick={handleOpenModal}
              className="rounded-sm bg-secondary-normal px-8 py-2 text-[16px]"
            >
              إضافة مصاريف +
            </button>
          </div>
        </div>
        <div className="flex h-full justify-center overflow-x-auto">
          <div className="-m-1.5 h-full w-full overflow-x-auto">
            <div className="inline-block h-full w-full p-1.5 align-middle">
              <div className="h-full w-full rounded-md bg-[#1d3c58] py-3">
                <div className="flex w-full justify-between px-4 py-3 pl-8">
                  <div className="relative max-w-xs">
                    <label className="sr-only">Search</label>
                    <input
                      type="text"
                      name="hs-table-with-pagination-search"
                      id="hs-table-with-pagination-search"
                      className="border-gray-200 rounded-lg block w-full bg-[#1d3c58] px-3 py-2 ps-9 text-[15px] text-white outline-none focus:z-10 disabled:pointer-events-none disabled:opacity-50"
                      placeholder="ابحث بنوع المصروف"
                    />
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-between ps-3">
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                        <svg
                          className="size-4 text-primary-light-active"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <path d="m21 21-4.3-4.3"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button onClick={toggleNavbar}>
                      <Image
                        width={30}
                        height={30}
                        src="/assets/icons/menu2.svg"
                        alt="dots"
                      />
                    </button>
                    {isOpen && (
                      <div
                        id="dropdownAction"
                        className="divide-gray-100 absolute left-[80px] z-10 w-[196px] divide-y rounded-sm border-2 border-[#436789] bg-[#082a48] p-4 text-white shadow"
                      >
                        <ul className="whitespace-nowrap rounded-t-sm bg-[#1d3c58] py-1 text-sm hover:text-[#e4ac66]">
                          <li>
                            <button className="block px-4 py-2">
                              ابحث بالتاريخ
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="rounded-xl grid w-full">
                  <div className="sm:rounded-lg relative overflow-auto">
                    <table className="w-full overflow-x-auto text-left rtl:text-right">
                      <thead className="bg-[#436789] uppercase text-white">
                        <tr>
                          <th
                            scope="col"
                            className="whitespace-nowrap px-6 py-3"
                          >
                            نوع المصاريف
                          </th>
                          <th
                            scope="col"
                            className="whitespace-nowrap px-6 py-3"
                          >
                            التاريخ
                          </th>
                          <th
                            scope="col"
                            className="whitespace-nowrap px-6 py-3"
                          >
                            المبلغ
                          </th>
                          <th
                            scope="col"
                            className="flex justify-end whitespace-nowrap px-6 py-3"
                          >
                            <button>
                              <Image
                                width={30}
                                height={30}
                                src="/assets/icons/dots.svg"
                                alt="dots"
                              />
                            </button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.data.map((expens, index) => (
                          <tr
                            key={expens._id}
                            className="bg-[#1d3c58] text-white"
                          >
                            <th
                              scope="row"
                              className="text-gray-900 whitespace-nowrap px-6 py-4 font-medium"
                            >
                              {expens.exType.name ?? expens.exTypeName}
                            </th>
                            <td className="whitespace-nowrap px-6 py-4">
                              {/* يوليو 2023 */}{" "}
                              {formatTransactionDate(expens.date)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {expens.cost} ريال
                            </td>
                            <td className="flex justify-end whitespace-nowrap px-6 py-4">
                              <button onClick={() => toggleNavbardots(index)}>
                                <Image
                                  width={30}
                                  height={30}
                                  src="/assets/icons/dots.svg"
                                  alt="dots"
                                />
                              </button>
                              {openedIndex === index && (
                                <div
                                  id="dropdownAction"
                                  className="divide-gray-100 fixed left-[120px] z-10 grid w-[196px] gap-2 divide-y rounded-sm border-2 border-[#436789] bg-[#082a48] p-4 text-white shadow"
                                >
                                  <ul className="whitespace-nowrap rounded-t-sm bg-[#1d3c58] py-1 text-sm hover:text-[#e4ac66]">
                                    <li>
                                      <button
                                        onClick={() => handleDelete(expens._id)}
                                        className="block w-full px-4 py-2 text-right"
                                      >
                                        {" "}
                                        حذف
                                      </button>
                                    </li>
                                  </ul>
                                  <ul className="whitespace-nowrap bg-[#082a48] py-1 text-sm hover:text-[#e4ac66]">
                                    <li>
                                      <button
                                        onClick={() => handleOpenModal2(expens)}
                                        className="block w-full px-4 py-2 text-right"
                                      >
                                        {" "}
                                        تعديل
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form onSubmit={handleCreate}>
          <h2 className="mb-4 text-xl font-light">حدد نوع المصاريف </h2>
          <div className="mb-4">
            <select
              name="exType"
              value={editExpensesData.exType}
              onChange={handleChange}
              className="focus:ring-blue-500 w-full rounded-sm border border-[#436789] bg-[#395875] px-4 py-2 focus:outline-none focus:ring-2"
            >
              <option value="">اختر نوع المصروف</option>
              {expenseType?.data.map(type => (
                <option key={type._id} value={type._id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <h2 className="mb-4 text-xl font-light">اختار التاريخ</h2>
          <div className="mb-4 rounded-sm">
            <input
              type="date"
              name="date"
              value={editExpensesData.date}
              onChange={handleEditInputChange}
              className="focus:ring-blue-500 w-full rounded-sm border border-[#436789] bg-[#395875] px-4 py-2 focus:outline-none focus:ring-2"
            />
          </div>
          <h2 className="mb-4 text-xl font-light"> حدد المبلغ</h2>
          <div className="mb-4 rounded-sm">
            <input
              type="number"
              name="cost"
              value={editExpensesData.cost}
              onChange={handleEditInputChange}
              placeholder="حدد المبلغ"
              className="focus:ring-blue-500 w-full rounded-sm border border-[#436789] bg-[#395875] px-4 py-2 focus:outline-none focus:ring-2"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-[200px] rounded-sm bg-[#e4ac66] px-4 py-2 text-[#092944]"
            >
              {isCreating ? "جارٍ الإضافة..." : "إضافة"}
            </button>
            <button
              onClick={handleCloseModal}
              className="w-[200px] rounded-sm border border-[#e4ac66] px-4 py-2 text-[#e4ac66]"
            >
              إلغاء
            </button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={isModalOpen2} onClose={handleCloseModal2}>
        <form onSubmit={handleUpdate}>
          <h2 className="mb-4 text-xl font-light">تعديل نوع المصاريف </h2>
          <div className="mb-4">
            <select
              name="exType"
              value={editExpensesData.exType}
              onChange={handleChange}
              className="focus:ring-blue-500 w-full rounded-sm border border-[#436789] bg-[#395875] px-4 py-2 focus:outline-none focus:ring-2"
            >
              <option value="اختر نوع">اختر نوع</option>
              {expenseType?.data.map(type => (
                <option key={type._id} value={type._id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <h2 className="mb-4 text-xl font-light">تعديل اختار التاريخ</h2>
          <div className="mb-4 rounded-sm">
            <input
              type="date"
              name="date"
              value={editExpensesData.date}
              onChange={handleEditInputChange}
              className="focus:ring-blue-500 w-full rounded-sm border border-[#436789] bg-[#395875] px-4 py-2 focus:outline-none focus:ring-2"
            />
          </div>
          <h2 className="mb-4 text-xl font-light"> تعديل المبلغ</h2>
          <div className="mb-4 rounded-sm">
            <input
              type="number"
              name="cost"
              value={editExpensesData.cost}
              onChange={handleEditInputChange}
              placeholder="تعديل المبلغ"
              className="focus:ring-blue-500 w-full rounded-sm border border-[#436789] bg-[#395875] px-4 py-2 focus:outline-none focus:ring-2"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-[200px] rounded-sm bg-[#e4ac66] px-4 py-2 text-[#092944]"
            >
              تعديل
            </button>
            <button
              onClick={handleCloseModal2}
              className="w-[200px] rounded-sm border border-[#e4ac66] px-4 py-2 text-[#e4ac66]"
            >
              إلغاء
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Sending;
