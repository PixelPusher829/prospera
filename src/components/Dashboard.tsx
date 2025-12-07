import React, { useState } from "react";
import {
	Plus,
	ArrowUpRight,
	ArrowDownRight,
	Wallet,
	Target,
	Bell,
	CheckCircle,
	CreditCard,
	DollarSign,
} from "lucide-react";
import { MOCK_SUMMARY, MOCK_TRANSACTIONS, MOCK_GOALS } from "../data/constants";
import AddEditTransactionModal from "./AddEditTransactionModal";

const Dashboard: React.FC<{ setActiveTab: (tab: string) => void }> = ({
	setActiveTab,
}) => {
	const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);

	return (
		<div className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8">
			{/* Welcome Section */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold text-slate-900 dark:text-white">
						Good Morning, James!
					</h1>
					<p className="text-slate-500 dark:text-slate-400 mt-1">
						Here is your financial health check for today.
					</p>
				</div>
								<button
									onClick={() => setIsAddTransactionModalOpen(true)}
									className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 font-medium transition-all shadow-lg shadow-violet-200 dark:shadow-none"
								>
									<Plus size={18} />
									Quick Add Transaction
								</button>
							</div>
				
							{/* Hero Cards - Net Worth & Safe to Spend */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
												{/* Net Worth */}
												<div className="bg-slate-900 dark:bg-violet-900/20 p-6 rounded-3xl shadow-xl text-white flex flex-col justify-between h-48 relative overflow-hidden group">									<div className="absolute right-0 top-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
										<Wallet size={100} />
									</div>
									<div className="z-10">
										<p className="text-slate-400 dark:text-violet-200 font-medium mb-1">
											Total Net Worth
										</p>
										<h2 className="text-3xl font-bold text-white">
											$54,710.50
										</h2>
									</div>
									<div className="z-10 flex items-center gap-2 text-sm bg-white/10 w-fit px-3 py-1.5 rounded-lg backdrop-blur-md">
										<ArrowUpRight size={16} className="text-green-400" />
										<span className="text-slate-200">+2.4% this month</span>
									</div>
								</div>
				
												{/* Monthly Budget Left */}
												<div 
													className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-between h-48 cursor-pointer hover:border-green-200 dark:hover:border-green-700 transition-colors"
													onClick={() => setActiveTab("budget")}
												>
													<div>
														<div className="flex items-center gap-2 mb-2">
															<div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
																<DollarSign size={18} />
															</div>
															<span className="font-semibold text-slate-900 dark:text-white">
																Safe to Spend
															</span>
														</div>
													</div>
													<div>
														<div className="flex justify-between items-end mb-2">
															<div>
																<h3 className="font-bold text-slate-900 dark:text-white">
																	Monthly Budget
																</h3>
																<p className="text-xs text-slate-500 dark:text-slate-400">
																	Target: $1,000.00
																</p>
															</div>
															<span className="text-xl font-bold text-green-600 dark:text-green-400">
																38%
															</span>
														</div>
														<div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
															<div
																className="bg-green-500 h-full rounded-full"
																style={{ width: "38%" }}
															></div>
														</div>
													</div>
												</div>				
								{/* Active Goals Summary */}
								<div
									className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-between h-48 cursor-pointer hover:border-violet-200 dark:hover:border-violet-700 transition-colors"
									onClick={() => setActiveTab("goals")}
								>
									<div>
										<div className="flex items-center gap-2 mb-2">
											<div className="p-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full">
												<Target size={18} />
											</div>
											<span className="font-semibold text-slate-900 dark:text-white">
												Top Goal
											</span>
										</div>
									</div>
									<div>
										<div className="flex justify-between items-end mb-2">
											<div>
												<h3 className="font-bold text-slate-900 dark:text-white">
													{MOCK_GOALS[0].name}
												</h3>
												<p className="text-xs text-slate-500 dark:text-slate-400">
													Target: $
													{MOCK_GOALS[0].targetAmount.toLocaleString()}
												</p>
											</div>
											<span className="text-xl font-bold text-violet-600 dark:text-violet-400">
												34%
											</span>
										</div>
										<div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
											<div
												className="bg-violet-600 dark:bg-violet-500 h-full rounded-full"
												style={{ width: "34%" }}
											></div>
										</div>
									</div>
								</div>
				
																{/* Alerts / Notifications */}
				
																<div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-48 overflow-y-auto">									<div className="flex items-center gap-2 mb-4">
										<div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full">
											<Bell size={18} />
										</div>
										<span className="font-semibold text-slate-900 dark:text-white">
											Notifications
										</span>
									</div>
									<div className="flex flex-col flex-grow justify-end">
										<div className="space-y-3">
											<div className="flex items-start gap-3 text-sm">
											<div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
											<p className="text-slate-600 dark:text-slate-300">
												Bill due tomorrow:{" "}
												<span className="font-semibold text-slate-900 dark:text-white">
													Internet ($80)
												</span>
											</p>
										</div>
										<div className="flex items-start gap-3 text-sm">
											<div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
											<p className="text-slate-600 dark:text-slate-300">
												Salary of{" "}
												<span className="font-semibold text-slate-900 dark:text-white">
													$4,200
												</span>{" "}
												received.
											</p>
										</div>
									</div>
									</div>
								</div>
							</div>
				
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
								{/* Recent Transactions List */}
								<div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
									<div className="flex justify-between items-center mb-6">
										<h3 className="font-bold text-lg text-slate-900 dark:text-white">
											Recent Transactions
										</h3>
										<button
											onClick={() => setActiveTab("transactions")}
											className="text-sm text-violet-600 dark:text-violet-400 font-medium hover:text-violet-700 dark:hover:text-violet-300"
										>
											View All
										</button>
									</div>
				
									<div className="space-y-4">
										{MOCK_TRANSACTIONS.slice(0, 5).map((t) => (
											<div
												key={t.id}
												className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors"
											>
												<div className="flex items-center gap-4">
													<div
														className={`p-3 rounded-full ${
															t.type === "income"
																? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
																: "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
														}`}
													>
														{t.type === "income" ? (
															<ArrowDownRight size={20} />
														) : (
															<ArrowUpRight size={20} />
														)}
													</div>
													<div>
														<h4 className="font-bold text-slate-900 dark:text-white text-sm">
															{t.payee}
														</h4>
														<p className="text-xs text-slate-500 dark:text-slate-400">
															{t.date} • {t.category}
														</p>
													</div>
												</div>
												<span
													className={`font-bold ${
														t.type === "income"
															? "text-green-600 dark:text-green-400"
															: "text-slate-900 dark:text-white"
													}`}
												>
													{t.type === "income" ? "+" : "-"}$
													{t.amount.toFixed(2)}
												</span>
											</div>
										))}
									</div>
								</div>
				
								{/* Spending Breakdown Mini */}
								<div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
									<h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">
											Cash Flow
									</h3>
									<div className="space-y-6">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
													<ArrowDownRight size={18} />
												</div>
												<div>
													<p className="text-xs text-slate-500 dark:text-slate-400">
														Income
													</p>
													<p className="font-bold text-slate-900 dark:text-white">
														$8,500.00
													</p>
												</div>
											</div>
											<div className="h-8 w-px bg-slate-100 dark:bg-slate-700"></div>
											<div className="flex items-center gap-3">
												<div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
													<ArrowUpRight size={18} />
												</div>
												<div>
													<p className="text-xs text-slate-500 dark:text-slate-400">
														Expense
													</p>
													<p className="font-bold text-slate-900 dark:text-white">
														$6,222.00
													</p>
												</div>
											</div>
										</div>
				
										<div className="pt-6 border-t border-slate-100 dark:border-slate-700">
											<h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
												Today's Spending
											</h4>
											<div className="space-y-3">
												<div className="flex justify-between text-sm">
													<span className="text-slate-500 dark:text-slate-400">
														Coffee
													</span>
													<span className="font-medium text-slate-900 dark:text-white">
														$5.40
													</span>
												</div>
												<div className="flex justify-between text-sm">
													<span className="text-slate-500 dark:text-slate-400">
														Transport
													</span>
													<span className="font-medium text-slate-900 dark:text-white">
														$12.00
													</span>
												</div>
												<div className="border-t border-slate-100 dark:border-slate-700 pt-2 flex justify-between text-sm font-bold">
													<span className="text-slate-700 dark:text-slate-300">
														Total
													</span>
													<span className="text-slate-900 dark:text-white">
														$17.40
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
										<AddEditTransactionModal 
											isOpen={isAddTransactionModalOpen} 
											onClose={() => setIsAddTransactionModalOpen(false)} 
										/>
									</div>
								);
							};
							
							export default Dashboard;
