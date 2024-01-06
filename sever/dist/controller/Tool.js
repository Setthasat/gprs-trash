"use strict";
class Tool {
    constructor(Model) {
        this.createAdress = async (req, res) => {
            const BaseResponseInst = new BaseResponse(201, 'create . . .', null);
            const { name, lat, lon } = req.body;
            if (!name) {
                BaseResponseInst.setValue(400, "name is invalid", null);
                return res.json(BaseResponseInst.buildResponse()).status(400);
            }
            if (!lat) {
                BaseResponseInst.setValue(400, "lat is invalid", null);
                return res.json(BaseResponseInst.buildResponse()).status(400);
            }
            if (!lon) {
                BaseResponseInst.setValue(400, "lon is invalid", null);
                return res.json(BaseResponseInst.buildResponse()).status(400);
            }
            const item = new this.Model({
                name: name,
                lat: lat,
                lon: lon
            });
            try {
                const items = await this.Model.create(item);
                BaseResponseInst.setValue(201, "create Adress successfully!", items);
            }
            catch (err) {
                console.log(`something went worng ! : ${err}`);
                BaseResponseInst.setValue(400, "something went worng !", null);
                return res.json(BaseResponseInst.buildResponse()).status(400);
            }
        };
        this.getAllData = async (req, res) => {
            // 
            const forms = await this.Model.find();
            const BaseResponseInst = new BaseResponse(200, "success", forms);
            const response = BaseResponseInst.buildResponse();
            return res.json(response).status(200);
        };
        this.Model = Model;
    }
}
module.exports = Tool;
class BaseResponse {
    constructor(code, description, data) {
        this.code = code;
        this.description = description;
        this.data = data;
    }
    buildResponse() {
        return {
            status: {
                code: this.code,
                description: this.description,
            },
            data: this.data
        };
    }
    setValue(code, description, data) {
        this.code = code;
        this.description = description;
        this.data = data;
    }
}
