/* eslint-disable no-use-before-define */
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

export default class Tags extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      options: top100Films,
      selectedOptions: [],
      value: "",
      newLabel: false
    };
  }
  render() {
    const { options, selectedOptions, value, newLabel } = this.state;

    return (
      <div>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={options}
          getOptionLabel={(option) => option}
          value={selectedOptions}
          onChange={(event, val) => {
            this.setState({ selectedOptions: val });
          }}
          onInputChange={(ev, value) => {
            if (value.trim() !== "" && !options.includes(value) && !newLabel) {
              const newOption = options;
              newOption.push(value + " (New Lable)");
              this.setState({
                option: newOption,
                value: value,
                newLabel: true
              });
            } else if (!options.includes(value) && newLabel) {
              const newOption = options;
              newOption[newOption.length - 1] = value + " (New Lable)";
              this.setState({
                option: newOption,
                value: value
              });
            } else if (options.includes(value) && newLabel) {
              const newOption = options;
              newOption.splice(newOption.length - 1, 1);
              this.setState({
                option: newOption,
                value: value,
                newLabel: false
              });
            } else {
              this.setState({ value: value });
            }
          }}
          inputValue={value}
          renderInput={(params) => (
            <TextField
              {...params}
              value={"asdasda"}
              variant="outlined"
              label="filterSelectedOptions"
              placeholder="Favorites"
              onKeyPress={(event) => {
                const { selectedOptions } = this.state;
                if (
                  event.key === "Enter" &&
                  newLabel &&
                  event.target.value.trim() !== ""
                ) {
                  selectedOptions.push(event.target.value);
                  this.setState({ selectedOptions, value: "" });
                }
              }}
            />
          )}
        />
      </div>
    );
  }
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Godfather: Part II",
  "The Dark Knight",
  "12 Angry Men"
];
