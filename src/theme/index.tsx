import { createGlobalStyle } from "styled-components";
import "../styles/_mixins.scss";

const $primary = "#0A3453";
const $bodyBackgroundColor = "#f0f8ff";
const $white = "#fff";

export default function GlobalStyle() {
  const GlobalStyle = createGlobalStyle`
        .ant-btn-primary {
            box-shadow: 0px 0px 1px 1px ${$primary};
            border-color: ${$primary} !important;
            background-color: ${$primary} !important;
            color: ${$white} !important;
            font-weight: 300;
            border-radius: 7px;
        }
        .ant-avatar{
            background-color: ${$primary} !important;
            color: ${$bodyBackgroundColor} !important;
        }
        .ant-modal-header{
            padding: 10px 12px;
            .ant-typography{
                font-size: 16px;
            }
        }
        .ant-modal-body{
            padding:12px;
            .ant-btn-dashed{
                border-radius: 7px;
            }
        }
        .ant-modal-close-x{
            width: 35px;
            height: 30px;
            line-height: 35px;
        }
        .ant-row{
            padding-top: 10px;
        }
        .ant-menu-light .ant-menu-item:hover,.ant-menu-light .ant-menu-item-active{
            color: ${$primary};
            background: rgba(10,52,83,0.25);
        }
        .ant-menu-item .ant-menu-item-selected .ant-menu-item-only-child{
            color: ${$primary};
            background: rgba(10,52,83,0.25);
        }
        .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{
            @include background-opacity(#0a3453, 0.25) !important;
        }
        .ant-menu-submenu-active{
            color: ${$primary} !important;
        }
        .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{
            color: ${$primary} !important;
            background: rgba(10,52,83,0.25);
        }
        .ant-layout .ant-layout-has-sider{
            height: 100%;
        }
        .ant-drawer-mask{
            background-color: rgba(0,0,0,0.10) !important;
        }
        .ant-form label {
            font-weight: 400 !important;
        }
        .ant-input:placeholder-shown {
            font-weight: 300 !important;
        }
        .ant-table {
            color: rgba(0, 0, 0) !important;
            
        }

        .ant-switch-checked {
            background-color: ${$primary} !important;
        }
    `;

  return <GlobalStyle />;
}
