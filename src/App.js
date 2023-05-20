import { useEffect, useState } from "react";
import "./CSS Files/App.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  // Get Data from LocalStorage
  const getLocalItems = () => {
    let list = localStorage.getItem("list");

    if (list) {
      return JSON.parse(localStorage.getItem("list"));
    } else {
      return [];
    }
  };

  const [input, setInput] = useState("");
  const [allElement, setAllElement] = useState(getLocalItems());
  const [toggle, setToggle] = useState(true);
  const [edit, setEdit] = useState(null);

  // Set Data at LocalStorage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(allElement));
  }, [allElement]);

  const handleList = () => {
    if (input && toggle) {
      const value = { id: new Date().getTime().toString(), item: input };
      setAllElement([...allElement, value]);

      toast.success("Task added successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if(input && !toggle){
      setAllElement(
        allElement.map((elem)=>{
          if(elem.id === edit){
            return {...elem, item:input}
          }
          return elem;
        })
      )
      setToggle(true);
      setEdit(null);
    } 
    else {
      toast.error("Please enter something to add!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleEdit = (id) => {
    let edit = allElement.find((elem)=>{
      return elem.id === id
    });
    console.log(edit);
    setToggle(false);
    setInput(edit.item)
    setEdit(id);
  }

  const handleDel = (id) => {
    let newArray = allElement.filter((curElem) => {
      return curElem.id !== id;
    });
    setAllElement(newArray);
    toast.info("Task removed successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleDelAll = () => {
    setAllElement([]);
    toast.error("All Tasks deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <>
      <div className="container">
        <h1 className="welcome">Welcome to My To-Do List</h1>
        <img
          className="image"
          src="https://cdn.pixabay.com/photo/2014/04/03/11/46/paper-312111_960_720.png"
          alt=""
          srcSet=""
        />
      </div>

      <div className="container2">
        <input
          id="input"
          placeholder="✍"
          name="email"
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        {
          toggle ? <button className="btn" onClick={handleList}> Add Task
          </button> : <button className="btn" onClick={handleList}> Edit Task</button>
        }
       
      </div>

      <ToastContainer />

      <div className="container3">
        {allElement.map((curElem) => {
          const { item, id } = curElem;
          return (
            <div className="wrapper" key={id}>
              <div className="center">{item}</div>
              <div className="right">
                <FiEdit
                  className="edit"
                  onClick={() => {
                    handleEdit(id);
                  }}
                />
                <FiTrash2
                  className="remove"
                  onClick={() => {
                    handleDel(id);
                  }}
                />
              </div>
            </div>
          );
        })}
        {allElement.length > 0 && (
          <button className="last-btn" onClick={handleDelAll}>
            Clear All
          </button>
        )}
      </div>
    </>
  );
}

export default App;
