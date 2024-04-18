import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { months } from "@/utils/months";
function BirthDate({ formik }) {
    const selectYear = new Date().getFullYear();
    const startYear = selectYear - 100;
    const endYear = selectYear - 16;
    const [isLeapYear, setIsLeapYear] = useState(false);
    useEffect(() => {
        const checkLeap =
            new Date(formik.values.birth_year, 1, 29).getDate() == 29;
        setIsLeapYear(checkLeap);
    }, [formik]);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
                <span className="block text-base font-semibold">
                    Date of Birth
                </span>
                {formik.errors.birth_date && formik.touched.birth_date && (
                    <span className="text-red-400 text-xs inline-block mb-1">
                        {formik.errors.birth_date}
                    </span>
                )}
                <span className="text-xs text-slate-500 block">
                    This will not be shown publicly. Confirm your own age, even
                    if this account is for a business, a pet, or something else.
                </span>
            </div>
            <div className="flex gap-1">
                <label
                    htmlFor="birth_day"
                    className="flex flex-col gap-0.5 shrink-0 w-1/3"
                >
                    <Select
                        name="birth_day"
                        onValueChange={(value) =>
                            formik.setFieldValue("birth_day", value)
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Day" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from(
                                {
                                    length: [4, 9, 6, 11].some(
                                        (date) =>
                                            date == formik.values.birth_month
                                    )
                                        ? 30
                                        : formik.values.birth_month == 2 &&
                                          !isLeapYear
                                        ? 28
                                        : isLeapYear
                                        ? 29
                                        : 31,
                                },
                                (_v, indx) => (
                                    <SelectItem key={indx} value={indx + 1}>
                                        {indx + 1}
                                    </SelectItem>
                                )
                            )}
                        </SelectContent>
                    </Select>
                </label>
                <label
                    htmlFor="birth_month"
                    className="flex flex-col gap-0.5 shrink-0 w-1/3"
                >
                    <Select
                        name="birth_month"
                        onValueChange={(value) =>
                            formik.setFieldValue("birth_month", value)
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: 12 }, (_v, indx) => (
                                <SelectItem key={indx} value={indx + 1}>
                                    {months[indx]}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </label>
                <label
                    htmlFor="birth_year"
                    className="flex flex-col gap-0.5 shrink-0 w-1/3"
                >
                    <Select
                        name="birth_year"
                        onValueChange={(value) =>
                            formik.setFieldValue("birth_year", value)
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from(
                                {
                                    length: endYear - startYear + 1,
                                },
                                (_v, indx) => (
                                    <SelectItem
                                        key={indx}
                                        value={startYear + indx}
                                    >
                                        {startYear + indx}
                                    </SelectItem>
                                )
                            )}
                        </SelectContent>
                    </Select>
                </label>
            </div>
        </div>
    );
}

export default BirthDate;
