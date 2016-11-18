import React from 'react';
import Form from 'react-jsonschema-form';

import DataTypeWidget from './widgets/DataTypeWidget';
import { csvToJSON } from '../utils/csv';

export const schema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {type: 'string', title: 'Indicator Name'},
    name_ar: {type: 'string', title: 'اسم المؤشر'},
    description: {
      title: 'Description',
      type: 'string'
    },
    description_ar: {
      title: 'تفصيل',
      type: 'string'
    },
    published: {
      title: 'Visibility',
      type: 'boolean',
      enumNames: ['Published', 'Draft']
    },
    private: {
      title: 'Privacy',
      type: 'boolean',
      enumNames: ['Private', 'Public']
    },
    category: {
      title: 'Type of Data',
      type: 'string'
    },
    type: {
      title: 'Type of Indicator',
      type: 'string',
      enum: [
        'SDS',
        'SDG',
        'Other'
      ]
    },
    sources: {
      type: 'array',
      title: 'Sources - مصادر',
      items: {
        title: 'Source',
        type: 'string'
      }
    },
    units: {
      type: 'string',
      title: 'Units - وحدة القياس'
    },
    data: {
      type: 'string',
      title: 'Data'
    }
  }
};

const uiSchema = {
  name: {
    classNames: 'section-half'
  },
  name_ar: {
    classNames: 'ar section-half section-half-left'
  },
  description: {
    classNames: 'with-ar',
    'ui:widget': 'textarea'
  },
  sources: {
    classNames: 'multiform-group form-block'
  },
  description_ar: {
    classNames: 'ar',
    'ui:widget': 'textarea'
  },
  category: {
    'ui:field': 'datatype'
  },
  published: {
    'ui:widget': 'radio',
    classNames: 'section-half'
  },
  private: {
    classNames: 'section-half section-half-left',
    'ui:widget': 'radio'
  },
  data: {
    'ui:widget': 'textarea',
    classNames: 'large'
  }
};

const validate = function validate (formData, errors) {
  if (formData.data) {
    try {
      console.log(csvToJSON(formData.data));
    } catch (e) {
      errors.data.addError('Is this a tab separated csv file? Contact an administrator if you\'re having problems adding data');
    }
  }
  return errors;
};

class IndicatorForm extends React.Component {
  render () {
    console.log(this.props);
    return <Form schema={schema}
      onSubmit={this.props.onSubmit}
      formData={this.props.formData}
      uiSchema={uiSchema}
      validate={validate}
      liveValidate
      showErrorList={false}
      fields={{
        'datatype': DataTypeWidget
      }}
    >
      <button type='submit' className='btn button--primary'>Submit</button>
      {this.props.children}
    </Form>;
  }

}

export default IndicatorForm;
