import { render, screen } from "../../test-utils";
import Login from "../../../Routes/Login";
import Home from "../../../Routes/Home";
import Consultas from "../../../Routes/Consultas";
import TabelaConsultas from "./TabelaConsultas";

const mockDentistas = [
  { matricula: 1, name: "Dentista 1" },
  { matricula: 2, name: "Dentista 2" },
  { matricula: 3, name: "Dentista 3" },
];

const mockConsultas = [
  {
    dataHoraAgendamento: "2023-07-02T10:00:00",
    dentista: { nome: "Dentista 1", sobrenome: "Sobrenome 1" },
    paciente: { nome: "Paciente 1", sobrenome: "Sobrenome 1" },
  },
];

test("It shgould render Login page", () => {
  render(<Login />);
  expect(screen.getByText("Login")).toBeInTheDocument();
});

test("It renders cards for each Dentist", async () => {
  jest.mock("axios", () => ({
    get: jest.fn().mockResolvedValue({ data: mockDentistas }),
  }));

  render(<Home />, { route: "/home", path: "/home" });

  const cards = await screen.findAllByTestId("card");
  expect(cards.length).toBe(mockDentistas.length);
});

test("It should render Consultas page and table items for each consulta", async () => {
  jest.mock("axios", () => ({
    get: jest.fn().mockResolvedValue({ data: mockConsultas }),
  }));

  render(<Consultas />);
  expect(TabelaConsultas).toHaveBeenCalledTimes(1);

  render(<TabelaConsultas />);

  const dataCells = await screen.findAllByText(
    /Data: \d{1,2}\/\d{1,2}\/\d{4} às \d{1,2}H \d{2}M/
  );
  expect(dataCells.length).toBe(mockConsultas.length);

  const dentistaCells = await screen.findAllByText(/Dentista \d Sobrenome \d/);
  expect(dentistaCells.length).toBe(mockConsultas.length);

  const pacienteCells = await screen.findAllByText(/Paciente \d Sobrenome \d/);
  expect(pacienteCells.length).toBe(mockConsultas.length);
});
