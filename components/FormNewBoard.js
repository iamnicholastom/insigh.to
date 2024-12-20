"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const FormNewBoard = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      const data = await axios.post("/api/board", { name });
      setName("");
      toast.success("Board created successfully");
      router.refresh();
    } catch (e) {
      const errorMessage =
        error.response?.data?.error || error.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-base-100 p-8 rounded-3xl space-y-8"
    >
      <p className="font-bold text-lg">Create a new feedback board</p>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Board name</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button className="btn btn-primary w-full" type="submit">
        {isLoading && (
          <span className="loading loading-spinner loading-md"></span>
        )}
        Create board
      </button>
    </form>
  );
};

export default FormNewBoard;
