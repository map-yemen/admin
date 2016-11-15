import React from 'react';
import Form from 'react-jsonschema-form';

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
      type: 'string',
      enum: [
        'Sequential',
        'Diverging',
        'Categorical'
      ]
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
      title: 'Sources (مصادر)',
      items: {
        type: 'string'
      }
    },
    units: {
      type: 'string',
      title: 'Units (وحدة القياس)'
    },
    data: {
      type: 'string',
      title: 'Data'
    }
  }
};

const uiSchema = {
  name: {
    'ui:placeholder': 'Unique name'
  },
  name_ar: {
    classNames: 'ar'
  },
  description: {
    'ui:widget': 'textarea'
  },
  description_ar: {
    classNames: 'ar',
    'ui:widget': 'textarea'
  },
  published: {
    'ui:widget': 'radio'
  },
  private: {
    'ui:widget': 'radio'
  },
  data: {
    'ui:widget': 'textarea',
    classNames: 'large'
  }
};

class IndicatorForm extends React.Component {
  render () {
    return <Form schema={schema}
      onSubmit={this.props.onSubmit}
      formData={this.props.formData}
      uiSchema = {uiSchema}
    >
      <button type='submit' className='btn button--primary'>Submit</button>
      {this.props.children}
    </Form>;
  }

}

export default IndicatorForm;
