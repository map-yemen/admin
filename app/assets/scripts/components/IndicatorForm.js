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
      title: 'الوصف',
      type: 'string'
    },
    published: {
      title: 'Visibility - مدى وضوح المشروع',
      type: 'boolean',
      enumNames: ['Published - تم النشر/ الاصدار', 'Draft - مسودة (نسخة أولية)']
    },
    category: {
      title: 'Type of Data - نمط البيانات',
      type: 'string'
    },
    theme: {
      title: 'Theme - موضوع',
      type: 'string',
      enum: [
        'Select a Theme',
        'Education & Training',
        'Health',
        'Economy',
        'Agriculture',
        'Domestic Policy',
        'Energy',
        'Environment'
      ]
    },
    type: {
      title: 'Type of Indicator - نوع المؤشر',
      type: 'string',
      enum: [
        'Select an Indicator',
        'SDS Indicator - مؤشرات استراتيجية التنمية المُستدامة',
        'SDG Indicator - مؤشرات أهداف التنمية المُستدامة',
        'Other Development Indicator - مؤشرات إنمائية أخرى'
      ]
    },
    sources: {
      type: 'array',
      title: 'Sources - المصادر',
      items: {
        title: 'Source',
        type: 'string'
      }
    },
    units: {
      type: 'string',
      title: 'Unit - وحدة القياس'
    },
    data: {
      type: 'string',
      title: 'Data - البيانات'
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
      csvToJSON(formData.data);
    } catch (e) {
      errors.data.addError('Is this a tab separated csv file? Contact an administrator if you\'re having problems adding data');
    }
  }
  return errors;
};

class IndicatorForm extends React.Component {
  onError (errors) {
    if (errors.length) {
      window.scroll(0, 0);
    }
  }

  render () {
    return <Form schema={schema}
      onSubmit={this.props.onSubmit}
      onChange={this.props.onChange}
      onError={this.onError.bind(this)}
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
