export const ROLE_SUPER_ADMIN = 1;
export const ROLE_COMPANY = 2;
export const ROLE_COMPANY_ADMIN = 'company-admin';
// export const
export const ROLE_LOGISTICS_MANAGER = 'logistics-manager';

export const SHIPPER_ID = 'shipper';
export const CONSIGNEE_ID = 'consignee';
export const CARRIER = 'carrier';
export const TRUCK = 'truck';
export const API_KEY = 'AIzaSyAaQsq5O2siI9OVa6qHNluso2kC04B_MT8';
export const ONE_SIGNAL_DRIVER = 'f41507bf-d266-4060-9491-c75181c3ccc5';
// shipment type
export const MATERIAL = 'material';
export const BULK = 'bulk';
export const NOTIFICATIONS_TYPE = {
  shipmentRequest: 'shipment_request',
  shipmentDriverAccept: 'shipment_driver_accept',
  shipmentDriverReject: 'shipment-driver-reject',
  shipmentCompleted: 'shipment_status_completed',
  shipmentStatusArrived: 'shipment_status_arrived',
  shipmentStatusApproaching: 'shipment_status_approaching',
  shipmentStatusDelayed: 'shipment_status_delayed',
  shipmentRemovedDriver: 'removed_shipment_driver',
  shipmentAssign: 'shipment_assign',
  message: 'new-message',
  groupMessage: 'new_group_message'
};
export const getShipmentTypeString = type => {
  if (type === MATERIAL) {
    return 'FTL Packaged';
  }
  if (type === BULK) {
    return 'Bulk';
  }
  return '';
};

// export co
