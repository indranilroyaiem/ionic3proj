export interface Issue {
  id: string;
  key: string;
  self: string;
  fields: {
    summary: string;
    issuetype: {
      name: string;
      iconUrl: string;
    };
    status: {
      name: string;
    };
    assignee: {
      displayName: string;
    };
    comment: {
      comments: {
        author: {
          displayName: string;
        };
        body: string;
        created: string;
      };
    };
    customfield_10300?: string; // Hostname
    customfield_10501?: string; // Static IP
    customfield_10500?: { // Tier of Equipment
      value: string;
      id: string;
    };
    customfield_10101?: { // Location
      value: string;
      id: string;
      child: {
        value: string;
        id: string;
      };
    };
    customfield_10105?: string; // Room Number
    customfield_10103?: string; // Date Purchased
    description?: string;
    labels?: string[];
    customfield_10306?: string; // Manufacturer
    customfield_10307?: string; // Model
    customfield_10102?: string; // Serial Number
    customfield_10308?: string; // CPU Model
    customfield_10304?: string; // RAM
    customfield_10305?: string; // HDD Size
    customfield_10309?: string; // Graphics Card
    customfield_10312?: string; // LAN MAC Address
    customfield_10313?: string; // WLAN MAC Address
    customfield_10303?: string[]; // Device ports
    customfield_10106?: string; // Screen Size
    customfield_10301?: { // Aspect Ratio
      value: string;
      id: string;
    };
    customfield_10302?: { // Native Resolution
      value: string;
      id: string;
    };
    customfield_10310?: { // Current Connection
      value: string;
      id: string;
    };
    customfield_10314?: string; // Lamp Model
    customfield_10315?: string; // Lamp Life
    customfield_10317?: string; // Type of Ink/Toner
    customfield_10316?: string; // Number of Trays
  }
}
