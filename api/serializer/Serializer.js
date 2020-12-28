const ValueNotSupported = require("../errors/ValueNotSupported");
const jsontoxml = require("jsontoxml");

class Serializer {
  json(data) {
    return JSON.stringify(data);
  }

  xml(data) {
    let tag = this.tagSingular;

    if (Array.isArray(data)) {
      tag = this.tagPlural;

      data = data.map((item) => ({
        [this.tagSingular]: item,
      }));
    }

    return jsontoxml({ [tag]: data });
  }

  serialize(data) {
    data = this.filter(data);

    if (this.contentType === "application/json") {
      return this.json(data);
    }

    if (this.contentType === "application/xml") {
      return this.xml(data);
    }

    throw new ValueNotSupported(this.contentType);
  }

  filterObject(data) {
    const obj = {};

    this.publicFields.forEach((field) => {
      console.log("FIELD", field);
      if (data.hasOwnProperty(field)) {
        obj[field] = data[field];
      }
    });

    console.log(obj);
    return obj;
  }

  filter(data) {
    if (Array.isArray(data)) {
      console.log(data);
      data = data.map((item) => this.filterObject(item));
    } else {
      data = this.filterObject(data);
    }

    return data;
  }
}

class SupplierSerializer extends Serializer {
  constructor(contentType, extraFields = []) {
    super();
    this.contentType = contentType;
    this.publicFields = ["id", "company", "category"].concat(extraFields);
    this.tagSingular = "supplier";
    this.tagPlural = "suppliers";
  }
}

class ErrorSerializer extends Serializer {
  constructor(contentType, extraFields = []) {
    super();
    this.contentType = contentType;
    this.publicFields = ["id", "message"].concat(extraFields);
    this.tagSingular = "error";
    this.tagPlural = "errors";
  }
}

module.exports = {
  Serializer,
  acceptedFormats: ["application/json", "application/xml"],
  SupplierSerializer,
  ErrorSerializer,
};
