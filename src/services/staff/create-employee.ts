import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import { Employee } from "types/employee";
import BackendError from "exceptions/backend-error";
import { BackendResponse } from "services/types";
import store from "store";
import createEmployeeOccupation from "./occupations/create-occupation";

const URL = `${API_BASE_URL}/staff`;

export default async function createEmployee(
  body: EmployeePayload
): Promise<Employee> {
  try {
    const response = await axios.post<BackendResponse<Employee>>(URL, body, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });

    await Promise.all(
      body.occupations.map((occupation) => {
        console.log(occupation);
        return createEmployeeOccupation(response.data.data.id, occupation);
      })
    );

    return response.data.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}

export interface EmployeePayload extends Omit<Employee, "id"> {
  password: string;
}
