class Tool {
    Model: any;
    constructor(Model: any) {
        this.Model = Model;
    }

    createAdress = async (req: { body: { name: any; lat: any; lon: any; }; }, res: { json: (arg0: { status: { code: number; description: string; }; data: any; }) => { (): any; new(): any; status: { (arg0: number): any; new(): any; }; }; }) => {
        const BaseResponseInst = new BaseResponse(201, 'creating . . .', null);
        const { name, lat, lon } = req.body;
        if (!name) {
            BaseResponseInst.setValue(400, "name is invalid", null);
            return res.json(BaseResponseInst.buildResponse()).status(400);
        } if (!lat) {
            BaseResponseInst.setValue(400, "lat is invalid", null);
            return res.json(BaseResponseInst.buildResponse()).status(400);
        } if (!lon) {
            BaseResponseInst.setValue(400, "lon is invalid", null);
            return res.json(BaseResponseInst.buildResponse()).status(400);
        }

        const item = new this.Model({
            name: name,
            lat: lat,
            lon: lon
        });

        console.log(item);

        try {
            const items = await this.Model.create(item);
            BaseResponseInst.setValue(201, "create Adress successfully!", items);
        } catch (err) {
            console.log(`something went worng ! : ${err}`);
            BaseResponseInst.setValue(400, "something went worng !", null);
            return res.json(BaseResponseInst.buildResponse()).status(400);
        }
    };

    getAllData = async (req: any, res: { json: (arg0: { status: { code: number; description: string; }; data: any; }) => { (): any; new(): any; status: { (arg0: number): any; new(): any; }; }; }) => {
        // 
        const forms = await this.Model.find();

        const BaseResponseInst = new BaseResponse(200, "success", forms);
        const response = BaseResponseInst.buildResponse();
        return res.json(response).status(200);
    };

    findSingleAdress = async (req: { params: { id: any; }; }, res: { json: (arg0: { status: { code: any; description: any; }; data: any; }) => { (): any; new(): any; status: { (arg0: number): any; new(): any; }; }; }) => {
        const BaseResponseInst = new BaseResponse(201, 'finding . . .', null);
        const { id } = req.params;

        try {
            const form = await this.Model.findById({ _id: id });
            BaseResponseInst.setValue(200, "success", form);
            return res.json(BaseResponseInst.buildResponse()).status(200);
        } catch (err) {
            console.log("something went worng", err);
            BaseResponseInst.setValue(400, "somethingwent worng", null);
            return res.json(BaseResponseInst.buildResponse()).status(400);
        }
    };

    deleteAdress = async (req: { params: { id: any; }; }, res: { json: (arg0: { status: { code: any; description: any; }; data: any; }) => { (): any; new(): any; status: { (arg0: number): any; new(): any; }; }; }) => {
        const BaseResponseInst = new BaseResponse(201, 'deleting . . .', null);
        const { id } = req.params;
        // validate
        if (!id) {
            BaseResponseInst.setValue(400, "id not found", null);
            return res.json(BaseResponseInst.buildResponse()).status(400);
        }
        // datababse  
        try {
            await this.Model.findByIdAndDelete({ _id: id });
            BaseResponseInst.setValue(204, "delete success", null);
            return res.json(BaseResponseInst.buildResponse()).status(204);
        } catch (err) {
            console.log("something went worng", err);
            BaseResponseInst.setValue(400, "somethingwent worng", null);
            return res.json(BaseResponseInst.buildResponse()).status(400);
        };

    };
}

module.exports = Tool;

class BaseResponse {
    code: any;
    description: any;
    data: any;
    constructor(code: any, description: any, data: any) {
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

    setValue(code: any, description: any, data: any) {
        this.code = code;
        this.description = description;
        this.data = data;
    }
}