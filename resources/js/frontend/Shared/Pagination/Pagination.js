import React, { Component } from "react";

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
            rowsPerPage: 0,
            totalPage: 1,
            firstLastGroupPage: 0,
            lastFirstGroupPage: 3,
        };
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            data: nextProps.data,
            page: nextProps.page,
            rowsPerPage: nextProps.rowsPerPage,
        });
        this.getTotalPage(nextProps);
    };

    getTotalPage = (nextProps) => {
        const { data, rowsPerPage } = nextProps;
        const totalPage = Math.ceil(data.length / rowsPerPage);
        const firstLastGroupPage = totalPage - 1;
        this.setState({ totalPage, firstLastGroupPage });
    };

    onChangePage = (page) => {
        this.setState({
            page: page,
        });
        this.props.onChangePage(page);
    };

    previousPage = () => {
        const { page } = this.state;
        let { firstLastGroupPage, lastFirstGroupPage } = this.state;
        if (page - 1 >= 1) {
            this.setState({
                page: this.state.page - 1,
            });
            this.props.onChangePage(this.state.page - 1);
        }
        if (firstLastGroupPage === page) {
            this.setState({
                firstLastGroupPage: firstLastGroupPage - 1,
            });
        }
        if (lastFirstGroupPage === page && lastFirstGroupPage - 1 >= 3) {
            this.setState({
                lastFirstGroupPage: lastFirstGroupPage - 1,
            });
        }
        
    };

    nextPage = () => {
        const { page, totalPage } = this.state;
        let { lastFirstGroupPage, firstLastGroupPage } = this.state;
        if (page + 1 <= totalPage) {
            this.setState({
                page: this.state.page + 1,
            });
            this.props.onChangePage(page + 1);
        }
        if (page === lastFirstGroupPage) {
            this.setState({
                lastFirstGroupPage: lastFirstGroupPage + 1,
            });
        }
        if (page === firstLastGroupPage && firstLastGroupPage + 1 < totalPage) {
            this.setState({
                firstLastGroupPage: firstLastGroupPage + 1,
            });
        }
    };

    render() {
        const { page, totalPage, firstLastGroupPage, lastFirstGroupPage } =
            this.state;
        console.log("totalPage", totalPage);
        let firstPages = [];
        let lastPages = [];
        if (totalPage <= 5) {
            for (let i = 2; i <= totalPage; i++) {
                firstPages.push(i);
            }
            lastPages = [];
        } else {
            firstPages = [lastFirstGroupPage - 1, lastFirstGroupPage];
            lastPages = [firstLastGroupPage, totalPage];
        }
        console.log("firstLastpage", firstPages);
        console.log("lastFIrstPage", lastPages);
        return (
            <div className="pagination-bar" style={{float: "right"}}>
                <nav aria-label="Page navigation example" >
                    <ul className="pagination pagination-seperated pagination-seperated-rounded">
                        <li className="page-item">
                            <a
                                className="page-link"
                                onClick={this.previousPage}
                                aria-label="Previous"
                            >
                                <span
                                    aria-hidden="true"
                                    className="mdi mdi-chevron-left mr-1"
                                />{" "}
                                Prev
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>
                        <li
                            key={1}
                            className={
                                page === 1 ? "page-item active" : "page-item"
                            }
                        >
                            <a
                                className="page-link"
                                onClick={() => this.onChangePage(1)}
                            >
                                {1}
                            </a>
                        </li>
                        {firstPages[0] !== 2 && lastPages.length > 0 ? (
                            <li className="page-item ">
                                <a className="page-link">...</a>
                            </li>
                        ) : (
                            ""
                        )}
                        {firstPages.map((item) => {
                            return (
                                <li
                                    key={item}
                                    className={
                                        page === item
                                            ? "page-item active"
                                            : "page-item"
                                    }
                                >
                                    <a
                                        className="page-link"
                                        onClick={() => this.onChangePage(item)}
                                    >
                                        {item}
                                    </a>
                                </li>
                            );
                        })}
                        {lastPages.length > 0 &&
                        lastFirstGroupPage !== firstLastGroupPage - 1 &&
                        page !== firstLastGroupPage - 1 ? (
                            <li className="page-item ">
                                <a className="page-link">...</a>
                            </li>
                        ) : (
                            ""
                        )}

                        {lastPages.length > 0 ? (
                            <div style={{display: 'flex'}}>
                                <li
                                    key={lastPages[0]}
                                    
                                    className={
                                        page === lastPages[0]
                                            ? "page-item active"
                                            : "page-item"
                                    }
                               
         
                                >
                                    <a
                                    
                                        className="page-link"
                                        onClick={() =>
                                            this.onChangePage(lastPages[0])
                                        }
                                    >
                                        {lastPages[0]}
                                    </a>
                                </li>
                                {firstLastGroupPage !== totalPage - 1 ? (
                                    <li className="page-item ">
                                        <a className="page-link">...</a>
                                    </li>
                                ) : (
                                    ""
                                )}
                                <li
                                    key={lastPages[1]}
                                    className={
                                        page === lastPages[1]
                                            ? "page-item active"
                                            : "page-item"
                                    }
                  
                                >
                                    <a
                                        className="page-link"
                                        onClick={() =>
                                            this.onChangePage(lastPages[1])
                                        }
                                    >
                                        {lastPages[1]}
                                    </a>
                                </li>
                            </div>
                        ) : (
                            ""
                        )}

                        <li className="page-item">
                            <a
                                className="page-link"
                                onClick={this.nextPage}
                                aria-label="Next"
                            >
                                Next
                                <span
                                    aria-hidden="true"
                                    className="mdi mdi-chevron-right ml-1"
                                />
                                <span className="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Pagination;
