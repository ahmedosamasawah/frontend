"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Modal from "../../../../common/components/model";
import {
  useGetAllExpenseTypesQuery,
  useDeleteExpensesTypesMutation,
  useUpdateExpensesTypesMutation,
  useCreateExpensesTyepsMutation,
} from "../../features/expensetypesApi";
import Loading from "../../../loading";

const SendingTypes = () => {
  const [editExpensesData, setEditExpensesData] = useState({
    id: "",
    name: "",
  });
  const { data, error, isLoading, refetch } = useGetAllExpenseTypesQuery(null);
  const [deleteExpensesTypes] = useDeleteExpensesTypesMutation();
  const [createExpensesTyeps, { isLoading: isCreating }] =
    useCreateExpensesTyepsMutation();
  const [updateExpensesTypes] = useUpdateExpensesTypesMutation();

  useEffect(() => {
    if (data) {
      console.log("Response Data:", data);
    }
    if (error) {
      console.log("Error:", error);
    }
  }, [data, error]);

  const handleEditInputChange = e => {
    const { name, value } = e.target;
    setEditExpensesData({
      ...editExpensesData,
      [name]: value,
    });
  };

  const handleDelete = async id => {
    try {
      await deleteExpensesTypes(id).unwrap();
      console.log(`Expens with ID ${id} deleted successfully`);
      refetch();
    } catch (err) {
      console.error("Failed to delete the Expens: ", err);
    }
  };
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [isModalOpen2, setModalOpen2] = useState(false);

  const handleOpenModal2 = expenseType => {
    setEditExpensesData({
      id: expenseType._id,
      name: expenseType.name,
    });
    setModalOpen2(true);
  };

  const handleCloseModal2 = () => {
    setModalOpen2(false);
  };
  // downlaod

  const handleCreate = async e => {
    e.preventDefault();
    const newExpenseData = { ...editExpensesData };
    try {
      await createExpensesTyeps(newExpenseData).unwrap();
      console.log("Expense created successfully");
      refetch();
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to create expense: ", err);
    }
  };

  const handleUpdate = async e => {
    e.preventDefault();
    const { id, name } = editExpensesData;
    const updatedExpenseData = { name };
    console.log({ id, formData: updatedExpenseData }); // Ensure you're passing the correct format
    try {
      await updateExpensesTypes({ id, formData: updatedExpenseData }).unwrap();
      console.log("Expense updated successfully");
      refetch();
      setModalOpen2(false);
    } catch (err) {
      console.error("Failed to update expense: ", err);
    }
  };

  if (isLoading || isCreating)
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
            <p className="text-[18px] text-white">انواع المصاريف</p>
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
              <div className="h-full w-full rounded-md bg-[#1d3c58] pb-3">
                <div className="flex w-full items-center justify-between rounded-t-md bg-[#436789] px-4 py-3 pl-8">
                  <div className="relative flex h-[60px] max-w-xs items-center text-[16px] text-white">
                    نوع المصاريف
                  </div>
                </div>
                <div className="grid w-full rounded-md">
                  <div className="relative overflow-auto rounded-t-md">
                    <table className="w-full overflow-x-auto rounded-t-md text-left rtl:text-right">
                      <tbody>
                        {data.data.map(expensType => (
                          <tr
                            key={expensType._id}
                            className="bg-[#1d3c58] text-white"
                          >
                            <th
                              scope="row"
                              className="text-gray-900 whitespace-nowrap px-6 py-4 font-medium"
                            >
                              {expensType.name}
                            </th>
                            <td className="flex justify-end gap-4 whitespace-nowrap px-6 py-4">
                              <button
                                onClick={() => handleOpenModal2(expensType)}
                                className="flex items-center gap-1 text-[#e4ac66]"
                              >
                                <Image
                                  width={30}
                                  height={30}
                                  className="text-[#e4ac66]"
                                  src="/assets/icons/edite2.svg"
                                  alt="edit"
                                />
                                تعديل
                              </button>
                              <button
                                onClick={() => handleDelete(expensType._id)}
                                className="rounded-sm bg-white px-3 py-2 text-[#a92432]"
                              >
                                حذف النوع
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* <div className="py-1 px-4">
                                        <nav className="flex items-center space-x-1 text-white text-[16px]">
                                            <button
                                                type="button"
                                                className="p-2.5 w-[40px] h-[40px] inline-flex justify-center items-center text-[22px] rounded-full text-gray-800 hover:bg-primary-normal disabled:opacity-50 disabled:pointer-events-none"
                                            >
                                                <span aria-hidden="true">«</span>
                                                <span className="sr-only">Previous</span>
                                            </button>
                                            <button
                                                type="button"
                                                className="min-w-[40px] text-[16px] flex justify-center items-center text-gray-800 hover:text-secondary-normal py-2.5  rounded-full disabled:opacity-50 disabled:pointer-events-none"
                                                aria-current="page"
                                            >
                                                1
                                            </button>
                                            <button
                                                type="button"
                                                className="min-w-[40px] text-[16px] flex justify-center items-center text-gray-800 hover:text-secondary-normal py-2.5 rounded-full disabled:opacity-50 disabled:pointer-events-none"
                                            >
                                                2
                                            </button>
                                            <button
                                                type="button"
                                                className="min-w-[40px] text-[16px] flex justify-center items-center text-gray-800 hover:text-secondary-normal py-2.5 rounded-full disabled:opacity-50 disabled:pointer-events-none"
                                            >
                                                3
                                            </button>
                                            <button
                                                type="button"
                                                className="p-2.5 w-[40px]  h-[40px] inline-flex justify-center items-center text-[22px] rounded-full text-gray-800 hover:bg-primary-normal disabled:opacity-50 disabled:pointer-events-none"
                                            >
                                                <span className="sr-only">Next</span>
                                                <span aria-hidden="true">»</span>
                                            </button>
                                        </nav>
                                    </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form onSubmit={handleCreate}>
          <h2 className="mb-4 text-xl font-light"> اسم النوع </h2>
          <div className="mb-4 rounded-sm">
            <input
              name="name"
              value={editExpensesData.name}
              onChange={handleEditInputChange}
              placeholder="اسم النوع"
              type="text"
              className="focus:ring-blue-500 w-full rounded-sm border border-[#436789] bg-[#395875] px-4 py-2 focus:outline-none focus:ring-2"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-[200px] rounded-sm bg-[#e4ac66] px-4 py-2 text-[#092944]"
            >
              اضافة
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
          <h2 className="mb-4 text-xl font-light"> عدل اسم النوع </h2>
          <div className="mb-4 rounded-sm">
            <input
              name="name"
              value={editExpensesData.name}
              onChange={handleEditInputChange}
              placeholder="عدل اسم النوع"
              type="text"
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

export default SendingTypes;
