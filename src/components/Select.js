import React, { Component } from 'react';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class Select extends Component {
    constructor(props) {
      super(props);

      this.state = {
        selectedOption: "placeholder",
        options: props.options
      }
    }

    handleChange(e) {
      this.props.onSelection(e)
      this.setState({selectedOption: e.target.value});
    }

    componentDidMount() {
      this.$field = $(this.field);
      this.$field.material_select();

      this.handleChange = this.handleChange.bind(this);
      this.$field.on('change', this.handleChange);

      $(document).ready(function() {
        $('select').material_select();
      });
    }

    componentWillUnmount() {
      this.$field.off('change', this.handleChange);
      // this.$field.chosen('destroy');
    }

    render() {

      var label = null;
      if (this.props.label) {
        label = <label>{this.props.label}</label>
      }
      return (
        // use second elem in tuple to set disabled style
        <div>
          <select ref={field => this.field = field} defaultValue={this.state.selectedOption}>
             <option value={"placeholder"} disabled selected>{this.props.placeholder}</option>
             {
               Object.values(this.state.options).map((option, index) =>
                 <option value={option[0]} disabled>
                   <a className="black-text">{option[0]}</a>
                </option>
               )
             }
          </select>
          {label}
        </div>
      );
    }
}

export default Select;
