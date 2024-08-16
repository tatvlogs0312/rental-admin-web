const AUTHENTICATION_SERVICE_URL = 'http://localhost:65430/authentication-service';
const ADMIN_SERVICE_URL = 'http://localhost:65432/administration-service';

module.exports.api = {
    LOGIN_URL: AUTHENTICATION_SERVICE_URL + '/v1/login',
    LOGIN_URL_V2: ADMIN_SERVICE_URL + '/auth/login',

    UTILITY_FIND_ALL_URL: ADMIN_SERVICE_URL + '/utility/find-all',
    UTILITY_DELETE_URL: ADMIN_SERVICE_URL + "/utility/delete-utility",
    UTILITY_UPDATE_URL: ADMIN_SERVICE_URL + "/utility/update-utility",
    UTILITY_ADD_URL: ADMIN_SERVICE_URL + "/utility/add-utility",

    HOUSE_GET_ALL_URL: ADMIN_SERVICE_URL + "/house/get-house",
    HOUSE_DETAIL_URL: ADMIN_SERVICE_URL + "/house/get-room",
    HOUSE_ADD_URL: ADMIN_SERVICE_URL + "/house/add-house",

    ROOM_ADD_URL: ADMIN_SERVICE_URL + "/house/add-room",
    ROOM_DELETE_URL: ADMIN_SERVICE_URL + "/house/delete-room",
    ROOM_UPDATE_URL: ADMIN_SERVICE_URL + "/house/update-room",
    ROOM_SEARCH_URL: ADMIN_SERVICE_URL + "/house/room-search",
    
    GET_PROVINCE_URL: ADMIN_SERVICE_URL + "/province",
    GET_DISTRICT_URL: ADMIN_SERVICE_URL + "/province/district",
    GET_WARD_URL: ADMIN_SERVICE_URL + "/province/ward",

    SEARCH_CONTRACT_URL: ADMIN_SERVICE_URL + "/contract/search",
    CONTRACT_CREATE_URL: ADMIN_SERVICE_URL + "/contract/create",
    CONTRACT_DETAIL_URL: ADMIN_SERVICE_URL + "/contract/detail",
    CONTRACT_UPLOAD_URL: ADMIN_SERVICE_URL + "/contract/upload-identity",
    CONTRACT_TEMINATION_URL: ADMIN_SERVICE_URL + "/contract/termination",
    CONTRACT_EFFECTIVE_URL: ADMIN_SERVICE_URL + "/contract/effective",

    BILL_SEARCH_URL: ADMIN_SERVICE_URL + "/bill/search",
    BILL_PAYMENT_URL: ADMIN_SERVICE_URL + "/bill/payment",
    BILL_CREATE_URL: ADMIN_SERVICE_URL + "/bill/create",
}