package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.graphics.Color;
import android.os.Bundle;

import com.samsung.android.lib.shealth.visual.chart.base.Label;
import com.samsung.android.lib.shealth.visual.chart.base.attribute.LineAttribute;
import com.samsung.android.lib.shealth.visual.chart.base.attribute.RectAttribute;
import com.samsung.android.lib.shealth.visual.chart.base.attribute.TextAttribute;
import com.samsung.android.lib.shealth.visual.chart.base.axis.AxisTick;
import com.samsung.android.lib.shealth.visual.chart.base.bullet.BarBullet;
import com.samsung.android.lib.shealth.visual.chart.base.bullet.Bullet;
import com.samsung.android.lib.shealth.visual.chart.base.bullet.TextBullet;
import com.samsung.android.lib.shealth.visual.chart.base.constant.Baseline;
import com.samsung.android.lib.shealth.visual.chart.base.data.ChartData;
import com.samsung.android.lib.shealth.visual.chart.base.guide.GuideLine;
import com.samsung.android.lib.shealth.visual.chart.xychart.BulletGraph;
import com.samsung.android.lib.shealth.visual.chart.xychart.XyChart;
import com.samsung.android.lib.shealth.visual.core.type.StrokeStyle;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private static final int MIN_DATA_RANGE = 0;
    private static final int Y_MAX_DATA_RANGE = 60;
    private static final int X_MAX_DATA_RANGE = 6;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        XyChart xyChart = findViewById(R.id.xy_chart);

        createXyChart(xyChart);
    }

    private void createXyChart(XyChart xyChart) {
        xyChart.setBackgroundColor(Color.WHITE);
        xyChart.setGraphPadding(15, 5, 50, 5);
        xyChart.setGraphMargins(5, 15, 5, 25);
        xyChart.setXWidthInScreen(3);

        xyChart.getYAxis().setDataRange(MIN_DATA_RANGE, Y_MAX_DATA_RANGE);
        xyChart.getXAxis().setDataRange(MIN_DATA_RANGE, X_MAX_DATA_RANGE);

        createGuideLine(xyChart);
        createBarGraph(xyChart);
        createAxisTick(xyChart);
        createMinMaxGuideLine(xyChart);

        //ChartData - > BarBullet -> RectAttribute
        // AxisTick -> TextBullet -> TextAttribute
    }

    private void createMinMaxGuideLine(XyChart xyChart) {
        //GuideLine > Label > TextAttribute
        List<GuideLine> guideLines = xyChart.getGuideLines(xyChart.getYAxis());
        if(guideLines == null) guideLines = new ArrayList<>();

        GuideLine guideLineTop = new GuideLine(Y_MAX_DATA_RANGE);
        Label label = new Label(getGuideLineTopTextAttr());
        label.setString(Y_MAX_DATA_RANGE+"");
        guideLineTop.addLabel(label);
        guideLines.add(guideLineTop);

        GuideLine guideLineBottom = new GuideLine(MIN_DATA_RANGE);
        Label label2 = new Label(getGuideLineBottomTextAttr());
        label2.setString(MIN_DATA_RANGE+"");
        guideLineBottom.addLabel(label2);
        guideLines.add(guideLineBottom);

        xyChart.setGuideLines(xyChart.getYAxis(), guideLines);
    }

    private void createAxisTick(XyChart xyChart) {
        List<AxisTick> ticks = new ArrayList<>();

        String[] chartDataValue = {"F", "S", "S", "M", "T", "W", "T"};

        for(int i=0;i<7;i++){
            AxisTick axisTick = new AxisTick(i, chartDataValue[i]);
            axisTick.setBullet(getTextBullet());
            ticks.add(axisTick);
        }
        xyChart.getXAxis().setTicks(ticks);
    }

    private void createBarGraph(XyChart xyChart) {
        BulletGraph barGraph = new BulletGraph(this, xyChart.getXAxis(), xyChart.getYAxis());
        xyChart.addGraph("BarGraph", barGraph);

        List<ChartData> chartDataList = new ArrayList<>();
        float[] chartDataValue = {23, 5, 55, 19, 9, 33, 59};

        BarBullet barBullet = new BarBullet(this, getRectAttr());

        for(int i=0;i<7;i++){
            ChartData chartData = new ChartData(i, chartDataValue[i], barBullet);
            Label label = new Label(getLabelTextAttr());
            label.setString(chartDataValue[i]+"");
            chartData.addLabel(label);
            chartDataList.add(chartData);
        }

        barGraph.setData(chartDataList);
    }

    private void createGuideLine(XyChart xyChart) {

        List<GuideLine> guideLineList = new ArrayList<>();

        int pos = 5;

        for(int i=0;i<5;i++){
            GuideLine guideLine = new GuideLine(pos);
            guideLine.setAttribute(getLineAttr());
            guideLineList.add(guideLine);
            pos += 10;
        }

        xyChart.setGuideLines(xyChart.getYAxis(), guideLineList);
    }

    private LineAttribute getLineAttr(){
        LineAttribute.Builder builder = new LineAttribute.Builder();
        builder.setStrokeStyle(StrokeStyle.DOTTED)
                .setSpacing(10)
                .setThickness(5)
                .setColor(Color.BLACK);
        return builder.build();
    }

    private RectAttribute getRectAttr(){
        RectAttribute.Builder builder = new RectAttribute.Builder();
        builder.setWidth(10)
                .setCornerRadius(5)
                .setAlignment(Baseline.Alignment.CENTER_HORIZONTAL | Baseline.Alignment.BOTTOM)
                .setColor(Color.BLUE);
        return builder.build();
    }

    private TextBullet getTextBullet() {
        TextBullet textBullet = new TextBullet(this, getTextAttr());
        return textBullet;
    }

    private TextAttribute getTextAttr() {
        TextAttribute.Builder builder = new TextAttribute.Builder();
        builder.setColor(Color.BLACK)
                .setAlignment(Baseline.Alignment.CENTER)
                .setSize(20);
        return builder.build();
    }

    private TextAttribute getLabelTextAttr() {
        TextAttribute.Builder builder = new TextAttribute.Builder();
        builder.setColor(Color.BLUE)
                .setSize(20)
                .setFormat("%.0f")
                .setOffsetY(-30)
                .setBaseline(Baseline.DATA_TOP | Baseline.DATA_CENTER_HORIZONTAL)
                .setAlignment(Baseline.Alignment.TOP | Baseline.Alignment.CENTER_HORIZONTAL);
        return builder.build();
    }

    private TextAttribute getGuideLineTopTextAttr() {
        TextAttribute.Builder builder = new TextAttribute.Builder();
        builder.setColor(Color.RED)
                .setSize(20)
                .setFormat("%.0f")
                .setOffsetX(-20)
                .setBaseline(Baseline.GRAPH_TOP | Baseline.GRAPH_END)
                .setAlignment(Baseline.Alignment.END | Baseline.Alignment.TOP);
        return builder.build();
    }

    private TextAttribute getGuideLineBottomTextAttr(){
        TextAttribute.Builder builder = new TextAttribute.Builder();
        builder.setColor(Color.RED)
                .setSize(20)
                .setFormat("%.0f")
                .setOffsetX(-20)
                .setBaseline(Baseline.GRAPH_BOTTOM | Baseline.GRAPH_END)
                .setAlignment(Baseline.Alignment.END | Baseline.Alignment.BOTTOM);
        return builder.build();
    }
}




