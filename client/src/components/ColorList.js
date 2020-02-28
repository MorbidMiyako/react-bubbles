import React, { useState } from "react";
import axios from "axios";

const initialColor = {
  color: "",
  code: { hex: "" },
  id: null
};

const ColorList = ({ colors, updateColors, setChange, axiosWithAuth }) => {
  console.log("colors inside ColorList", colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    console.log("ran editColor")
    setEditing(true);
    setColorToEdit(color);
  };

  const cancelColor = () => {
    console.log("ran cancelColor")
    setColorToEdit(initialColor)
    setEditing(false)
  }

  console.log(colorToEdit)

  const saveNewColor = e => {
    console.log("ran saveNewColor")

    e.preventDefault();
    setColorToEdit({ ...colorToEdit, id: Date.now() })
    console.log("e inside saveNewColor of ColorList", colorToEdit);
    axiosWithAuth().post(`http://localhost:5000/api/colors`, colorToEdit);
    setChange(true);
  }

  const saveEdit = e => {
    console.log("ran saveEdit")
    e.preventDefault();
    console.log("e inside saveEdit of ColorList", colorToEdit);
    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit);
    setChange(true);
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    console.log("ran deleteColor")
    // make a delete request to delete this color
    console.log(color);
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`);
    setChange(true);
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.id} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing ? (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button type="button" onClick={() => cancelColor()}>cancel</button>
          </div>
        </form>
      ) : (<form onSubmit={saveNewColor}>
        <legend>add color</legend>
        <label>
          color name:
            <input
            onChange={e =>
              setColorToEdit({ ...colorToEdit, color: e.target.value })
            }
            value={colorToEdit.color}
          />
        </label>
        <label>
          hex code:
            <input
            onChange={e =>
              setColorToEdit({
                ...colorToEdit,
                code: { hex: e.target.value }
              })
            }
            value={colorToEdit.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">save</button>
          <button type="button" onClick={() => cancelColor()}>cancel</button>
        </div>
      </form>)}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
