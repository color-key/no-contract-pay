import {createStyles, makeStyles, Theme, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from './table-pagination';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import moment from 'moment';
import clsx from 'clsx';

const StyledTableCell = withStyles((theme: Theme) =>
	createStyles({
		head: {
			backgroundColor: theme.palette.grey[200],
			color: theme.palette.common.black,
			padding: '14px 16px'
		},
		body: {
			fontSize: 14,
		},
	}),
)(TableCell);

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		unLoading: {
			display: 'none'
		},
		progress: {
			margin: theme.spacing(2),
		},
	}),
);

interface Pagination {
	page: number,
	rowsPerPage: number,
	count: number,
	onChange: Function
}

interface Column {
	key?: string,
	width: number | string,
	title: string,
	dataIndex: string,
	dateFormat?: string,
	render?: Function
}

interface Props {
	columns: Column[],
	dataSource: any[],
	rowKey?: string | Function,
	pagination?: Pagination,
	className?: string,
	loading?: boolean
}

const CustomizedTables = ({columns, dataSource, rowKey, pagination, loading, ...otherProps}: Props) => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Table {...otherProps}>
				<TableHead>
					<TableRow>
						{
							columns.map((item) => {
								const {width, title, key, dataIndex, dateFormat, render, ...itemProps} = item;
								return <StyledTableCell key={key || dataIndex} style={{width}} {...itemProps}>{title}</StyledTableCell>;
							})
						}
					</TableRow>
				</TableHead>
				<TableHead className={clsx({[classes.unLoading]: !loading})}>
					<TableRow>
						<TableCell colSpan={1000} style={{padding: 0}}>
							<LinearProgress variant="query"/>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{
						dataSource.length === 0 && !loading &&
						<TableRow>
							<TableCell colSpan={1000} style={{textAlign: 'center'}}>
								未查询到数据
							</TableCell>
						</TableRow>
					}
					{dataSource.map((row:any, rowIndex) => (
						<TableRow key={rowKey ? (typeof rowKey === 'string' ? rowKey : rowKey(row)) : rowIndex} role={row.orgId}>
							{
								columns.map((item, i) => {
									const {key, dataIndex, dateFormat, render, ...itemProps} = item;
									const text = dateFormat ? (row[dataIndex] ? moment(row[dataIndex]).format(dateFormat) : '-') : row[dataIndex];
									return (
										<StyledTableCell key={key || dataIndex} {...itemProps}>
											{render ? render(text, row, i) : text}
										</StyledTableCell>
									);
								})
							}
						</TableRow>
					))}
				</TableBody>
				{
					pagination &&
					<TableFooter>
						<TableRow>
							<TablePagination page={pagination.page} rowsPerPage={pagination.rowsPerPage} onChange={pagination.onChange} count={pagination.count}/>
						</TableRow>
					</TableFooter>
				}
				{
					dataSource.length > 0 &&
					<TableFooter className={clsx({[classes.unLoading]: !loading})}>
						<TableRow>
							<TableCell colSpan={1000} style={{padding: 0}}>
								<LinearProgress variant="query"/>
							</TableCell>
						</TableRow>
					</TableFooter>
				}
			</Table>
		</React.Fragment>
	);
};

export default CustomizedTables
