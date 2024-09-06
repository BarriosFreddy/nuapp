declare module 'react-native-config' {
    export interface NativeConfig {
        WOMPI_API_URL?: string;
        WOMPI_API_PUB_KEY?: string;
    }
    
    export const Config: NativeConfig
    export default Config
  }