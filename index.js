import { createRoot } from 'react-dom/client';
import './index.css';
import * as React from 'react';
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import { DropDownTree } from '@syncfusion/ej2-dropdowns';
import { updateSampleSection } from './sample-base';
import { PropertyPane } from './property-pane';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Edit,
  Toolbar,
} from '@syncfusion/ej2-react-grids';

import * as dataSource from './default-data.json';
function Default() {
  React.useEffect(() => {
    updateSampleSection();
  }, []);
  let data = dataSource;
  let ddTree;
  let fields = {
    dataSource: data.defaultData,
    value: 'id',
    text: 'name',
    child: 'subChild',
  };
  function onChange() {
    let value = document.getElementById('value');
    let text = document.getElementById('text');
    // update the text and value property values in property panel based on selected item in Dropdown Tree
    value.innerHTML =
      ddTree.value && ddTree.value.length > 0 ? ddTree.value[0] : '';
    text.innerHTML = ddTree.text;
  }
  // call the change event's function after initialized the component.
  function rendereComplete() {
    onChange();
  }
  const toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
  };
  const columnTemplate = (props) => {
    console.log('props', props);
    return (
      <DropDownTreeComponent
        ref={(dropdowntree) => {
          ddTree = dropdowntree;
        }}
        fields={fields}
        change={onChange.bind(this)}
        changeOnBlur={false}
        placeholder="Select a folder or file"
        popupHeight="200px"
      />
    );
  };

  let countryObj;
  let countryElem;
  let stateObj;
  const countryParams = {
    create: () => {
      countryElem = document.createElement('input');
      return countryElem;
    },
    destroy: () => {
      countryObj.destroy();
    },
    read: () => {
      debugger;
      return countryObj.text;
    },
    write: () => {
      debugger;
      countryObj = new DropDownTree({
        /*change: () => {
          stateObj.enabled = true;
          const tempQuery = new Query().where(
            'countryId',
            'equal',
            countryObj.value
          );
          stateObj.query = tempQuery;
          stateObj.text = '';
          stateObj.dataBind();
        },*/
        fields: {
          dataSource: data.defaultData,
          value: 'id',
          text: 'name',
          child: 'subChild',
        },
        floatLabelType: 'Never',
        placeholder: 'Select a country',
      });
      countryObj.appendTo(countryElem);
    },
  };

  return (
    <GridComponent
      dataSource={dataSource}
      toolbar={toolbarOptions}
      allowPaging={true}
      editSettings={editSettings}
    >
      <ColumnsDirective>
        <ColumnDirective
          headerText="columns"
          edit={countryParams}
        ></ColumnDirective>
        <ColumnDirective field="Name"></ColumnDirective>
      </ColumnsDirective>
      <Inject services={[Page, Toolbar, Edit]} />
    </GridComponent>
  );
}
export default Default;

const root = createRoot(document.getElementById('sample'));
root.render(<Default />);
