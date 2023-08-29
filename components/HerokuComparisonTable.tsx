import { forwardRef } from 'react'

  
export const HerokuComparisonTable = forwardRef(function HerokuComparisonTable() {  
    
    const comparisonRows = [
        ["Your AWS Account", "✅", "❌"],
        ["Use AWS Credits", "✅", "❌ (Use Heroku Credits)"],
        ["Pricing Structure", "Number of services and deployments (AWS costs are additional)", "Scales up with size and number of dynos"],
        ["Git Push Based Deployments", "✅", "✅"],
        ["Autoscaling", "✅", "Performance Dynos Only"],
        ["Preview Environments", "✅", "✅"],
        ["Build System", "Nixpacks", "Buildpacks"],
        ["Managed Database", "✅", "✅"],
        ["Managed Redis", "✅", "✅"],
        ["Http/2", "✅", "❌"],
        ["Any AWS Region", "✅", "2 Regions, unless using Private Spaces ($1,200/month)"],
    ];
    
    
    return <table className={"w-full mx-20 border-collapse"}>
        <thead>
            <tr>
                <th></th>
                <th className={"text-white py-4 text-center"}>Flightcontrol</th>
                <th className={"text-white py-4 text-center"}>Heroku</th>
            </tr>
        </thead>
        <tbody>
                { comparisonRows.map((row, key) => {
                    return <tr key={key}>
                        <td className={"text-slate-200 py-4 px-2 text-center border border-slate-400"}>{row[0]}</td>
                        <td className={"text-slate-200 py-4 px-2 text-center border border-slate-400"}>{row[1]}</td>
                        <td className={"text-slate-200 py-4 px-2 text-center border border-slate-400"}>{row[2]}</td>
                    </tr>
                }) }
        </tbody>
    </table>
});
