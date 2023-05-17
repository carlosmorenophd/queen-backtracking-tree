import { useState } from "react";
import { playAgain } from "./utils/playQueen";
import Tree from "react-d3-tree";
import { useFormik } from "formik";
import * as Yup from 'yup';

const queenSchema = Yup.object().shape({
  numberQueens: Yup.number()
    .min(1, 'Min needs one queen')
    .required('Required'),
});

function App() {

  const [tree, setTree] = useState({
    name: '0,0',
    attributes: {
      status: 'safe',
    },
    children: [],
  });


  const formik = useFormik({
    initialValues: {
      numberQueens: 0,
    },
    validationSchema: queenSchema,
    onSubmit: values => {
      console.log("Launch queens");
      setTree(playAgain(values.numberQueens));
    },
  })

  return (
    <div className="w-screen h-screen flex flex-col">
      <div>
        <h1>
          Set N queens on board of chess
        </h1>
        Return a graph (tree) of execution
      </div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="numberQueens" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          </div>
          <input
            type="number"
            id="numberQueens"
            name="numberQueens"
            className="block w-full p-4 pl-10 text-lg text-black border border-gray-300 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Put the number of Queens"
            value={formik.values.numberQueens}
            onChange={formik.handleChange}
          />
          {formik.errors.numberQueens && formik.touched.numberQueens ? (
            <div class="bg-indigo-900 text-center py-4 lg:px-4">
              <div class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">Error</span>
                <span class="font-semibold mr-2 text-left flex-auto">{formik.errors.numberQueens}</span>
                <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg>
              </div>
            </div>
          ) : null}
          <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Play queens</button>
        </div>
      </form>
      <div className="w-3/2" style={{ height: 1500 }} >
        <Tree data={tree} orientation="vertical" />
      </div>
    </div>
  );
}

export default App;
