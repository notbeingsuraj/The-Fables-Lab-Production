import BootGateway from "@/components/home/BootGateway";
import HeroStatement from "@/components/home/HeroStatement";
import NycChamber from "@/components/home/NycChamber";
import Manifesto from "@/components/home/Manifesto";
import CapabilityMatrix from "@/components/home/CapabilityMatrix";
import DispatchCta from "@/components/home/DispatchCta";

/**
 * Home — the maximalist studio portal.
 *
 * 01 Boot gateway (interactive switch core) → 02 hero statement → 03 NYC
 * chamber → 04 manifesto → 05 capability matrix → 06 dispatch protocol.
 */
export default function Home() {
  return (
    <div className="w-full selection:bg-primary-container/25 selection:text-on-surface">
      <BootGateway />
      <HeroStatement />
      <NycChamber />
      <Manifesto />
      <CapabilityMatrix />
      <DispatchCta />
    </div>
  );
}
