const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const AirWayBillController = {
    
    get router() {
        const router = Router();

        //router.use(inject('userSerializer'));
        router.post('/trackAWB', this.trackbyRajaOngkir);
        router.post('/trackAWB2', this.trackAnterajabyAyiip);
        // router.get('/:id', inject('getUser'), this.show);
        // router.post('/', inject('createUser'), this.create);
        // router.put('/:id', inject('updateUser'), this.update);
        // router.delete('/:id', inject('deleteUser'), this.delete);

        return router;
    },
    trackAnterajabyAyiip(req, res, next) {
        const axios = require('axios').default;
        axios({
            url: "http://ayiip.com/tracking/anteraja.php?resi="+req.query.waybill,
            timeout: 11000,
            method: 'GET'
        }).then(function (response) {
            console.log("ok");
            //console.log(response.data);
            res.send(response.data);
        })
        .catch(function (error) {
            console.log("error");
            console.log(error.message);
            res.send(typeof error.response != "undefined"?error.response.data:error.message);
        });
    },
    trackbyRajaOngkir(req, res, next) {
        const axios = require('axios').default;
        const responseData = {
            
        }
        axios({
            url: "https://pro.rajaongkir.com/api/waybill",
            timeout: 11000,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'key': 'c1958599c8d9171e1020b56eaeda20b3' },
            data: {
                "waybill": req.query.waybill,
                "courier": req.query.courier
            }
        })
            .then(function (response) {
                console.log("ok");
                //console.log(response.data);
                responseData.status = response.data.rajaongkir.status.code;
                responseData.waybill = response.data.rajaongkir.query.waybill;
                responseData.courier = response.data.rajaongkir.query.courier;
                responseData.isDelivered = response.data.rajaongkir.result.delivered;
                responseData.jenisPaket = response.data.rajaongkir.result.summary.service_code;
                responseData.tanggalResi = response.data.rajaongkir.result.summary.waybill_date;
                responseData.namaPengirim = response.data.rajaongkir.result.summary.shipper_name;
                responseData.namaPenerima = response.data.rajaongkir.result.summary.receiver_name;
                responseData.namaPenerimaAktual = response.data.rajaongkir.result.delivery_status.pod_receiver;
                responseData.alamatAsal = response.data.rajaongkir.result.summary.origin +" "+
                response.data.rajaongkir.result.details.shipper_address1 + " " +
                response.data.rajaongkir.result.details.shipper_address2 + " " +
                response.data.rajaongkir.result.details.shipper_address3; 
                responseData.alamatTujuan = response.data.rajaongkir.result.summary.destination +" "+
                response.data.rajaongkir.result.details.receiver_address1 + " " +
                response.data.rajaongkir.result.details.receiver_address2 + " " +
                response.data.rajaongkir.result.details.receiver_address3; 
                responseData.tglTerima = response.data.rajaongkir.result.delivery_status.pod_date;
                responseData.waktuTerima = response.data.rajaongkir.result.details.waybill_time;
                responseData.tglKirim = response.data.rajaongkir.result.details.waybill_date;
                responseData.waktuKirim = response.data.rajaongkir.result.delivery_status.pod_time;
                responseData.manifest = response.data.rajaongkir.result.manifest;
                res.send(responseData);
            })
            .catch(function (error) {
                console.log("error");
                console.log(error.message.status);
                res.send(typeof error.response != "undefined"?error.response.data.rajaongkir.status:error.message);
            });
        
    }
};
module.exports = AirWayBillController;