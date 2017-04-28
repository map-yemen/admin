function byString (o, s) {
  s = s.replace(/\[(\w+)\]/g, '.items.properties'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  var a = s.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
}

function isEmptyObj (data) {
  return Object.keys(data).length === 0 || Object.values(data).every((el) => typeof el === 'undefined');
}

function setMaybe (schema, formData) {
  for (let key in formData) {
    let data = formData[key];
    if (typeof data !== 'undefined' &&
      typeof schema.properties[key] !== 'undefined') {
      if (schema.properties[key].type === 'array') {
        if (data.length === 0) {
          formData[key] = undefined;
        }
      } else if (schema.properties[key].type === 'object') {
        if (isEmptyObj(data)) {
          formData[key] = undefined;
        }
      }
    }
  }
  return formData;
}

function transformErrors (errors) {
  let ret = errors.map((error) => {
    if (error.name === 'required') {
      if (error.property === 'instance') {
        let title = error.schema.properties[error.argument].title;
        return Object.assign({}, error, {
          message: `${title} is required`
        });
      } else {
        error.argument.replace('instance.', '');
        let title = byString(error.schema.properties, error.argument).title;
        return Object.assign({}, error, {
          message: `${title} is required`
        });
      }
    } else if (error.name === 'type') {
      const title = error.schema.title;
      const type = error.schema.type;

      return Object.assign({}, error, {
        message: `${title} must be a ${type}`
      });
    } else {
      return error;
    }
  });
  return ret;
}

module.exports = {byString, setMaybe, transformErrors};
