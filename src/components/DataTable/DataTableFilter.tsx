import { Col, Row } from "react-bootstrap";
import { Button, Popover } from "antd";
import FilterComponent from "./FilterComponent";
import { FiFilter } from "react-icons/fi";

const DataTableFilter = ({
  filterState: { filters, setFilters },
  filtersConfig,
  setPagination,
  pagination,
}: any) => {
  const content = (
    <div>
      <Row>
        <Col xs={6}>
          <strong>Filters</strong>
        </Col>
        <Col xs={6}>
          <Button
            style={{ float: "right", color: "#0A3453" }}
            type="link"
            onClick={() => {
              const newValue = { ...filters };
              Object.keys(newValue).forEach(
                (prop) => (newValue[prop].value = null)
              );
              setFilters(newValue);
            }}
          >
            Clear
          </Button>
        </Col>
      </Row>
      <hr />
      {filtersConfig &&
        filtersConfig.map((filterConfig: any) =>
          filterConfig && !filterConfig.hidden ? (
            <Row key={filterConfig.paramName} className="mb-2">
              <Col xs={4}>
                <span>{filterConfig.label}</span>
              </Col>
              <Col xs={8}>
                <FilterComponent
                  value={filters[filterConfig.paramName]}
                  component={filterConfig.component}
                  onChange={(value: any) => {
                    const newValue = { ...filters };
                    newValue[filterConfig.paramName] = {
                      value: "target" in value ? value.target.value : value,
                      label: filterConfig.label,
                      beforeRequest: filterConfig.beforeRequest,
                      displayFormat: filterConfig.displayFormat,
                    };
                    setFilters(newValue);
                    setPagination({ ...pagination, current: 1 });
                  }}
                />
              </Col>
            </Row>
          ) : null
        )}
    </div>
  );

  return filtersConfig && filtersConfig.length > 0 ? (
    <>
      <Popover trigger="click" content={content} placement="bottomRight">
        <Button
          type="link"
          style={{ color: "#0A3453", display: "flex", alignItems: "center" }}
        >
          <FiFilter style={{ marginRight: "5px" }} /> Filters
        </Button>
      </Popover>
    </>
  ) : null;
};

export default DataTableFilter;
