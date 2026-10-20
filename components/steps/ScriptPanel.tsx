export default function ScriptPanel() {
  return (
    <div className="flex h-full flex-col" aria-hidden="true">
      <div className="flex items-center gap-2 border-b border-[#14181f1f] px-4 py-2">
        <span className="chip border-[#14181f2e] text-[#545b66]">
          TC-014.spec.ts
        </span>
        <span className="chip border-[#1f7a4d3d] text-[#1f7a4d]">Playwright · TS</span>
        <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-[#545b66]">
          Verify before run
        </span>
      </div>

      <pre className="flex-1 overflow-hidden px-4 py-3 font-mono text-[10.5px] leading-[1.7] text-[#14181f]">
        <code>
          <span className="text-[#545b66]">{"// generated from approved TC-014 · edit freely"}</span>
          {"\n"}
          <span className="text-[#e4572e]">test</span>
          <span>(</span>
          <span className="text-[#1f7a4d]">&quot;pre-close queued after cutoff&quot;</span>
          <span>, async (&#123; page &#125;) =&gt; &#123;</span>
          {"\n  "}
          <span className="text-[#e4572e]">await</span>
          <span> page.</span>
          <span className="text-[#8a5cc2]">goto</span>
          <span>(BASE + </span>
          <span className="text-[#1f7a4d]">&quot;/loans/preclose&quot;</span>
          <span>);</span>
          {"\n  "}
          <span className="text-[#e4572e]">await</span>
          <span> page.</span>
          <span className="text-[#8a5cc2]">getByLabel</span>
          <span>(</span>
          <span className="text-[#1f7a4d]">&quot;Loan ID&quot;</span>
          <span>).</span>
          <span className="text-[#8a5cc2]">fill</span>
          <span>(loanId);</span>
          {"\n  "}
          <span className="text-[#e4572e]">await</span>
          <span> page.</span>
          <span className="text-[#8a5cc2]">getByRole</span>
          <span>(</span>
          <span className="text-[#1f7a4d]">&quot;button&quot;</span>
          <span>, &#123; name: </span>
          <span className="text-[#1f7a4d]">&quot;Request&quot;</span>
          <span> &#125;).</span>
          <span className="text-[#8a5cc2]">click</span>
          <span>();</span>
          {"\n  "}
          <span className="text-[#e4572e]">await</span>
          <span> </span>
          <span className="text-[#8a5cc2]">expect</span>
          <span>(page.</span>
          <span className="text-[#8a5cc2]">getByTestId</span>
          <span>(</span>
          <span className="text-[#1f7a4d]">&quot;status&quot;</span>
          <span>)).</span>
          <span className="text-[#8a5cc2]">toHaveText</span>
          <span>(</span>
          <span className="text-[#1f7a4d]">&quot;Queued&quot;</span>
          <span>);</span>
          {"\n"}
          <span>&#125;);</span>
        </code>
      </pre>

      <div className="flex items-center gap-2 border-t border-[#14181f1f] px-4 py-2.5">
        <span className="font-mono text-[10px] text-[#545b66]">
          inputs: URL · role: maker · data: loan #8841
        </span>
        <span className="ml-auto rounded-md border border-[#1f7a4d4d] px-2.5 py-1 font-mono text-[10px] text-[#1f7a4d]">
          ✓ Verified by you
        </span>
      </div>
    </div>
  );
}
